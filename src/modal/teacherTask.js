
export default async function handler(req,res){
    if(req.method === "POST"){
        try {
            
        } catch (error) {
            
        }
    }
    else{
        res.status(405).json({success:false,message:"Method not allowed"})
    }

}