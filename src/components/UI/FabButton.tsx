import { Box, CircularProgress, Fab } from "@mui/material";
import { FC } from "react";

import EditRoundedIcon from '@mui/icons-material/EditRounded'
import SaveRoundedIcon from '@mui/icons-material/SaveRounded'

export const FabButton: FC<{ onPressEdit: () => void; editMode: boolean; loading: boolean }> = ({
    onPressEdit,
    loading,
    editMode,
  }) => {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Fab color="primary" aria-label="add" onClick={onPressEdit}>
          {editMode ? (
            loading ? (
              <CircularProgress size="30px" color="inherit" />
            ) : (
              <SaveRoundedIcon />
            )
          ) : (
            <EditRoundedIcon />
          )}
        </Fab>
      </Box>
    )
  }