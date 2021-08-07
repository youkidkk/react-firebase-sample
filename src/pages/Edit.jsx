import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  makeStyles,
  Slider,
  TextField,
  Typography,
} from "@material-ui/core";
import { ArrowLeft, ArrowRight } from "@material-ui/icons";
import ContentsTitle from "components/ContentsTitle";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    padding: "1rem",
  },
  form: {
    width: "100%",
  },
}));

const initialFormState = {
  overview: "",
  deadline: new Date().toISOString().split("T")[0],
  priority: 3,
  detail: "",
};

const Edit = (props) => {
  const classes = useStyles();

  const [formState, setFormState] = useState(initialFormState);

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handlePriorityChange = (event, value) => {
    setFormState({
      ...formState,
      priority: value,
    });
  };

  const handlePriorityAdjust = (step) => {
    const newValue = formState.priority + step;
    if (0 <= newValue && newValue <= 5) {
      setFormState({
        ...formState,
        priority: formState.priority + step,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="sm">
      <Card className={classes.card}>
        <ContentsTitle title="登録" />
        <form className={classes.form} onSubmit={handleSubmit}>
          <Box mt={2}>
            <Typography>概要</Typography>
            <TextField
              name="overview"
              inputProps={{ required: true }}
              fullWidth
              margin="dense"
              variant="outlined"
              value={formState.overview}
              onChange={handleChange}
            />
          </Box>
          <Box mt={2}>
            <Typography>期限</Typography>
            <TextField
              name="deadline"
              type="date"
              inputProps={{ required: true }}
              margin="dense"
              variant="outlined"
              value={formState.deadline}
              onChange={handleChange}
            />
          </Box>
          <Box mt={2}>
            <Typography>優先度（高⇔低）</Typography>
            <Grid container alignItems="center">
              <Grid item xs={1}>
                <IconButton onClick={() => handlePriorityAdjust(-1)}>
                  <ArrowLeft />
                </IconButton>
              </Grid>
              <Grid item xs={10}>
                <Slider
                  name="priority"
                  valueLabelDisplay="auto"
                  step={1}
                  min={1}
                  max={5}
                  value={formState.priority}
                  onChangeCommitted={handlePriorityChange}
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={() => handlePriorityAdjust(1)}>
                  <ArrowRight />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
          <Box mt={2}>
            <Typography>詳細</Typography>
            <TextField
              name="detail"
              fullWidth
              margin="dense"
              variant="outlined"
              multiline
              maxRows={5}
              value={formState.detail}
              onChange={handleChange}
            />
          </Box>
          <Box mt={4} display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained" color="primary">
              登録
            </Button>
          </Box>
        </form>
      </Card>
    </Container>
  );
};

export default Edit;
