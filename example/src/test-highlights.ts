import axios from 'axios';
import { IHighlight } from './react-pdf-highlighter';
const searchParams = new URLSearchParams(window.location.search);
const urlParam = searchParams.get("url");
const docName = searchParams.get("docName");
const user = searchParams.get("user");
import { version } from "./App";

export interface TestHighlights {
  [key: string]: IHighlight[];
  
}

interface DataType {
  // Add other properties of the data as needed
}
interface ResponseData {
  version: string;
  Inhouse: boolean;

  // Define other properties of the response data if needed
}
// Initialize testHighlights as an empty object
export const testHighlights: TestHighlights = {};

// Fetch highlights from the API and populate testHighlights
export const fetchHighlights = async (): Promise<void> => {
  try {
    console.log("yah aaya ha ");
    
    if (!docName) {
      throw new Error("docName is not provided");
    }

// <<<<<<< HEAD
    const response = await axios.get(`http://127.0.0.1:8083/api/documents/comments?docName=${docName}&user=${user}`, {
// =======
//     const response = await axios.get(`http://127.0.0.1:8083/api/documents/comments?docName=${docName}`, {
// >>>>>>> 01c2059cf8ac58b94f13f476e72d33a7e54a5610
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(docName,'docName');
    
    console.log("Highlights fetched from backend:", response.data);

    console.log(version,'version');
    console.log(typeof(version));
    
    const data = response.data.filter((res: ResponseData) => res.version === version);
    
    const users = user?.split(" ");
    console.log(data,'data');
    
    var final;
    if (users && users[0] === "6") {
      final = data.filter((res: ResponseData) => res.Inhouse === false);
    }
    console.log(final,'finally');
    
    if (urlParam) {

      testHighlights[urlParam] = final?final:data;
    } else {
      console.error("URL parameter is not provided.");
    }  
  } catch (error) {
    console.error("Error loading highlights:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};
