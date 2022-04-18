import React from "react";
import { Box, Button } from "@mui/material";
//@ts-ignore
import FileViewer from "react-file-viewer";

type Props = {
  attachment: string;
};

const FileView = ({ attachment }: Props) => {
  return (
    <>
      <a href={`http://localhost:8001/${attachment}`} download>
        <Button variant="outlined">Скачать</Button>
      </a>
      <Box overflow={"auto"} maxHeight={300}>
        <FileViewer
          fileType={attachment?.split(".").pop()}
          filePath={`http://localhost:8001/${attachment}`}
          onError={(e: React.ChangeEvent<HTMLInputElement>) => console.log(e)}
        />
      </Box>
    </>
  );
};

export default FileView;
