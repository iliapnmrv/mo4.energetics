import React from "react";
import { Box, Button } from "@mui/material";
//@ts-ignore
import FileViewer from "react-file-viewer";
import { IFile } from "types/item";
import Link from "next/link";

type Props = {
  attachment: IFile;
  deregistrationId: number;
};

const FileView = ({ attachment, deregistrationId }: Props) => {
  return (
    <>
      {console.log(attachment)}
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mb: "20px" }}
      >
        <a
          href={`http://localhost:8001/${attachment.path}`}
          download={attachment.name}
        >
          <Button variant="contained" sx={{ marginRight: "10px" }}>
            Скачать
          </Button>
        </a>

        <Box overflow={"auto"} maxHeight={300} width={"100%"}>
          <FileViewer
            fileType={attachment.path?.split(".").pop()}
            filePath={`http://localhost:8001/${attachment.path}`}
            onError={(e: React.ChangeEvent<HTMLInputElement>) => console.log(e)}
          />
        </Box>
      </Box>
    </>
  );
};

export default FileView;
