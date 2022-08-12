import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CategoryChooser from "../Components/CategoryChooser";
import QuantityInput from "../Components/QuantityInput/QuantityInput";
import FileChooser from "../Components/FileChooser";
import axiosInstance, { endPoints } from "../axiosInstance";
import OverlaySpinner from "../Components/OverlaySpinner";
import { useSelector } from "react-redux";

export default function RequestCustomProduct() {
  const [formInfo, setFormInfo] = useState({
    title: "",
    description: "",
    files: [],
    category: "",
    deliveryTime: 1,
    budget: 0,
  });
  const [formBusy, setFormBusy] = useState(false);
  const [alert, setAlert] = useState(<></>);

  const token = useSelector((state) => state.auth.user?.token);
  const onSubmit = async (e) => {
    e.preventDefault();
    setFormBusy(true);
    const formData = new FormData();
    Object.keys(formInfo).forEach((key) => {
      key !== "files" && formData.append(key, formInfo[key]);
    });

    // Files must be added seperately to the same field for form
    [...formInfo.files].forEach((item) => formData.append("files", item));

    try {
      const response = await axiosInstance.post(
        endPoints.BUYER_REQUEST,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFormBusy(false);
      setAlert(
        <Snackbar
          open={true}
          autoHideDuration={3000}
          onClose={(_) => setAlert(<></>)}
        >
          <Alert variant="filled" severity="success">
            <AlertTitle>Success</AlertTitle>
            Request uploaded successfully
          </Alert>
        </Snackbar>
      );
    } catch (err) {
      console.log(err);
      setAlert(
        <Snackbar
          open={true}
          autoHideDuration={3000}
          onClose={(_) => setAlert(<></>)}
        >
          <Alert variant="filled" severity="error">
            <AlertTitle>Error</AlertTitle>
            {err.response.data.message}
          </Alert>
        </Snackbar>
      );
      setFormBusy(false);
    }
  };

  return (
    <>
      <Card
        sx={{ maxWidth: "md", margin: "auto", mt: 15, position: "relative" }}
        component="form"
        onSubmit={onSubmit}
      >
        {formBusy && <OverlaySpinner />}
        <CardHeader
          title="Which Product Are You Looking For?"
          subheader="Describe the service you're looking to purchase - please be as detailed as possible"
        />
        <CardContent>
          <Stack spacing={2}>
            <TextField
              label="Title"
              fullWidth
              required
              value={formInfo.title}
              onChange={(e) =>
                setFormInfo({ ...formInfo, title: e.target.value })
              }
            />
            <TextField
              multiline
              label="I am looking for..."
              fullWidth
              required
              rows={6}
              value={formInfo.description}
              onChange={(e) =>
                setFormInfo({ ...formInfo, description: e.target.value })
              }
            />
            <FileChooser
              value={formInfo.files}
              onChange={(e, files) =>
                setFormInfo({ ...formInfo, files: files })
              }
              accept="*"
            />
            <CategoryChooser
              value={formInfo.category}
              onChange={(e) =>
                setFormInfo({ ...formInfo, category: e.target.value })
              }
              required
            />
            <QuantityInput
              required
              label="Delivery Time"
              value={formInfo.deliveryTime}
              onChange={(e) => setFormInfo({ ...formInfo, deliveryTime: e })}
            />
            <Stack direction="row" alignItems="center">
              <Typography flex={1}>Budget</Typography>
              <TextField
                required
                sx={{ flex: 2 }}
                type={"number"}
                inputMode="numeric"
                value={formInfo.budget}
                onChange={(e) =>
                  setFormInfo({ ...formInfo, budget: e.target.value * 1 })
                }
                inputProps={{
                  min: 0,
                }}
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>Rs. </Typography>,
                }}
              ></TextField>
            </Stack>
          </Stack>
        </CardContent>

        <CardActions>
          <Button type="submit" variant="contained" fullWidth>
            Submit
          </Button>
        </CardActions>
      </Card>
      {alert}
    </>
  );
}
