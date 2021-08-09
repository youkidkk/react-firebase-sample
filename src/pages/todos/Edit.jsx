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
import { ArrowLeft, ArrowRight, List } from "@material-ui/icons";
import { AuthContext } from "auth/AuthProvider";
import { DATE_FORMAT } from "common/common-const";
import ContentsTitle from "components/ContentsTitle";
import { MessageSnackbarContext } from "components/SnackBar";
import * as dateformat from "dateformat";
import { createTodo, getTodo, updateTodo } from "firebase-db";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

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
  deadline: dateformat(new Date(), DATE_FORMAT),
  priority: 3,
  details: "",
};

const getTodoAsync = async (uid, id, setTodo) => {
  try {
    setTodo(await getTodo(uid, id));
  } catch (error) {
    console.log(error);
  }
};

const Edit = (props) => {
  const classes = useStyles();

  const { currentUser } = useContext(AuthContext);
  const { showMessageSnackbar } = useContext(MessageSnackbarContext);
  const history = useHistory();
  const [formState, setFormState] = useState(initialFormState);

  const uid = currentUser.uid;
  const id = props.match.params.id;
  useEffect(() => {
    if (id) {
      getTodoAsync(uid, id, setFormState);
    }
  }, [uid, id]);

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

  const handleSubmit = async (event, history) => {
    event.preventDefault();
    if (id) {
      try {
        await updateTodo(
          uid,
          id,
          formState.overview,
          formState.deadline,
          formState.priority,
          formState.details
        );
        showMessageSnackbar(true, "success", "更新しました。");
        history.push("/todos/list");
      } catch (error) {
        showMessageSnackbar(true, "error", "更新に失敗しました。");
      }
    } else {
      try {
        await createTodo(
          currentUser.uid,
          formState.overview,
          formState.deadline,
          formState.priority,
          formState.details
        );
        showMessageSnackbar(true, "success", "登録しました。");
        history.push("/todos/list");
      } catch (error) {
        showMessageSnackbar(true, "error", "登録に失敗しました。");
      }
    }
  };

  const createOrUpdate = id ? "更新" : "登録";

  return (
    <Container maxWidth="sm">
      <Card className={classes.card}>
        <ContentsTitle title={`Todo${createOrUpdate}`} />
        <Box mt={3} display="flex">
          <IconButton onClick={() => history.push("/todos/list")}>
            <List />
          </IconButton>
        </Box>
        <form
          className={classes.form}
          onSubmit={(event) => handleSubmit(event, history)}
        >
          <Box mt={2}>
            <Typography variant="h6">概要</Typography>
            <TextField
              name="overview"
              inputProps={{ required: true }}
              fullWidth
              margin="dense"
              value={formState.overview}
              onChange={handleChange}
            />
          </Box>
          <Box mt={2}>
            <Typography variant="h6">期限</Typography>
            <TextField
              name="deadline"
              type="date"
              inputProps={{ required: true }}
              margin="dense"
              value={formState.deadline}
              onChange={handleChange}
            />
          </Box>
          <Box mt={2}>
            <Typography variant="h6">優先度（高⇔低）</Typography>
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
            <Typography variant="h6">詳細</Typography>
            <TextField
              name="details"
              fullWidth
              margin="dense"
              multiline
              minRows={5}
              maxRows={5}
              value={formState.details}
              onChange={handleChange}
            />
          </Box>
          <Box mt={4} display="flex" justifyContent="flex-end">
            <Button type="submit">{createOrUpdate}</Button>
          </Box>
        </form>
      </Card>
    </Container>
  );
};

export default Edit;
