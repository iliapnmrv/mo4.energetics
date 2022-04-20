import React from "react";
import { Box, Button } from "@mui/material";
import { IFile } from "types/item";
import Link from "next/link";
//@ts-ignore
import FileViewer from "react-file-viewer";
import { API_URL } from "http/index";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

type Props = {
  attachment: IFile;
  deregistrationId: number;
};

const FileView = ({ attachment, deregistrationId }: Props) => {
  const docs = [{ uri: `${API_URL}${attachment.path}` }];

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mb: "20px" }}
      >
        <a href={`${API_URL}${attachment.path}`} download={attachment.name}>
          <Button variant="contained" sx={{ marginRight: "10px" }}>
            Скачать
          </Button>
        </a>

        <Box overflow={"auto"} maxHeight={300} width={"100%"}>
          {attachment.path?.split(".").pop() === "docx" ? (
            <FileViewer
              fileType={attachment.path?.split(".").pop()}
              filePath={`${API_URL}${attachment.path}`}
              onError={(e: React.ChangeEvent<HTMLInputElement>) =>
                console.log(e)
              }
            />
          ) : (
            <DocViewer
              pluginRenderers={DocViewerRenderers}
              documents={docs}
              config={{ header: { disableFileName: true } }}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default FileView;
