import connectToDB from "@/config/mongoose";
import Student from "@/modal/student";
import { getToken } from "next-auth/jwt";
import upload from "@/config/multer";
import cloudinary from "@/config/cloudinary";
// import nextConnect from "next-connect"; // Used only for middleware

export const config = {
  api: {
    bodyParser: false, // Required for handling file uploads
  },
};

// Function to handle file uploads
const uploadMiddleware = (req, res) => {
  return new Promise((resolve, reject) => {
    upload.single("profile")(req, res, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export default async function handler(req, res) {
  await connectToDB();

  // Validate user authentication
  const token = await getToken({ req });
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized Person" });
  }
  const adminId = token.id;

  if (req.method === "POST") {
    try {
      // Handle file upload
      await uploadMiddleware(req, res);

      // Extract form data
      const { email, className, bloodGroup, mobile, section, religion, fatherName, motherName, gender, dob, fullName, lastName } = req.body;

      if (!email || !fullName) {
        return res.status(400).json({ success: false, message: "Email and Full Name are required" });
      }

      // Check if student already exists
      const existingStudent = await Student.findOne({ email });
      if (existingStudent) {
        return res.status(400).json({ success: false, message: "Student already exists" });
      }

      // Create new student object
      const newStudent = new Student({
        fullName,
        lastName,
        gender,
        dob,
        email,
        fatherName,
        motherName,
        className,
        bloodGroup,
        mobile,
        section,
        religion,
        adminId,
      });

      // Upload profile image to Cloudinary (if provided)
      if (req.file) {
        try {
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "profile_photos",
          });
          newStudent.image = result.secure_url;
        } catch (cloudinaryError) {
          console.error("Cloudinary upload error:", cloudinaryError);
          return res.status(500).json({ success: false, message: "Cloudinary upload failed", error: cloudinaryError.message });
        }
      }

      // Save student to database
      await newStudent.save();
      return res.status(201).json({ success: true, message: "Student registered successfully", student: newStudent });

    } catch (error) {
      console.error("Error registering student:", error);
      return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
  }

  else if (req.method === "GET") {
    const { id } = req.query;
    if (!id) return res.status(400).json({ success: false, message: "Student ID must be provided" });

    try {
      const studentDetails = await Student.findById(id);
      if (!studentDetails) return res.status(404).json({ success: false, message: "Student not found" });

      return res.status(200).json({ success: true, message: "Student retrieved successfully", studentDetails });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
  }

  else if (req.method === "PUT") {
    const { id } = req.query;
    if (!id) return res.status(400).json({ success: false, message: "Student ID is required" });

    try {
      const student = await Student.findById(id);
      if (!student) return res.status(404).json({ success: false, message: "Student not found" });

      const updateFields = req.body;
      await Student.findByIdAndUpdate(id, updateFields);

      return res.status(200).json({ success: true, message: "Student information updated successfully" });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
  }

  else {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
