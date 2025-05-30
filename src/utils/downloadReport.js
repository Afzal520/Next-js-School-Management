
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
 export const downloadExcel = (paginatedData) => {
        const worksheet = XLSX.utils.json_to_sheet(paginatedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
        });
    
        saveAs(blob, "report.xlsx");
      }