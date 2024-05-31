"use client";
import { BACKEND_AI_ROUTES } from "@/utils/routes/backend_routes";
import { HttpStatusCode } from "axios";
import jsPDF from "jspdf";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function AutoProjectButton({ template_document_URL, project_document_URL, deadlinePassed, template_document_type, project_document_type }) {
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);

  const [report, setReport] = useState(null);

  useEffect(() => {
    if (deadlinePassed) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [deadlinePassed]);


  const downloadReport = () => {
    const doc = new jsPDF();

    const { response } = report;
    const maxWidth = 180;
    const lineHeight = 6;
    const leftMargin = 20;
    const topMargin = 30;
    const bottomMargin = 30;

    const fontSize = 12; 

    let y = topMargin;

    const addTextToPDF = (text,bold) => {
      const lines = doc.splitTextToSize(text, maxWidth);
      let remainingLines = lines.length;
      const linesPerPage = Math.floor((doc.internal.pageSize.getHeight() - y - bottomMargin) / lineHeight);


      while (remainingLines > 0) {
        const linesToAdd = Math.min(linesPerPage, remainingLines);
        const linesToAddThisPage = lines.slice(lines.length - remainingLines, lines.length - remainingLines + linesToAdd);
        linesToAddThisPage.forEach(line => {
          doc.setFontSize(fontSize);
          if(bold)
            doc.setFont('times', 'bold');
          else
            doc.setFont('times', 'normal');
          line.trim()
          doc.text(line, leftMargin, y);
          y += lineHeight;
        });
        remainingLines -= linesToAdd;
        if (remainingLines > 0) {
          doc.addPage();
          y = topMargin;
        }
      }
    };

    addTextToPDF('\n\nAssessment Report',true);


    doc.addPage();

    y = topMargin;

    addTextToPDF('Analysis:\n',true);

    const formattedAnalysis = response.replace(/\*\*/g, '');

    addTextToPDF(formattedAnalysis,false);

    doc.save('Assessment_Report.pdf');
  };

  const getScore = async () => {
    try {
      setLoading(true);
      const response = await fetch(BACKEND_AI_ROUTES.automatedProjectAssessment, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          template_document_URL: template_document_URL,
          project_document_URL: project_document_URL,
          template_document_type: template_document_type,
          project_document_type: project_document_type
        }),
      });
      if(response.status === HttpStatusCode.Ok){
        const data = await response.json();
        setReport(data);
        console.log(data);
      } else (
        toast.error("Failed to generate report")
      )
      setLoading(false);
    } catch (error) {
        toast.error("Failed to generate report")
        setLoading(false);
    }
  };

  return (
    <div className="flex flex-col item-center justify-center">
      <button
        type="button"
        onClick={getScore}
        disabled={disable || loading}
        className="text-sm bg-black border-2 font-normal border-black text-white p-1.5 hover:bg-gray-100 hover:text-black disabled:cursor-not-allowed disabled:bg-gray-300 disabled:border-gray-300 disabled:text-black rounded-full"
      >
        {loading ? "Generating Report ... " : "Generate Assessment Report"}
      </button>
      {report && !loading && <button type="button" onClick={downloadReport} className="text-sm hover:text-blue-500">Report.pdf</button>}
    </div>
  );
}

export default AutoProjectButton;
