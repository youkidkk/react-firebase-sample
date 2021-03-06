import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { yellow } from "@material-ui/core/colors";
import { Add, List, Remove, Star, StarOutline } from "@material-ui/icons";
import { AuthContext } from "auth/AuthProvider";
import { DATE_FORMAT } from "common/common-const";
import ConfirmDialog from "components/ConfirmDialog";
import ContentsTitle from "components/ContentsTitle";
import { MessageSnackbarContext } from "components/SnackBar";
import dateformat from "dateformat";
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
  priorityStar: {
    color: yellow[900],
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
  const [submitConfirmOpen, setSubmitConfirmOpen] = useState(false);

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

  const handlePriorityAdjust = (step) => {
    const newValue = formState.priority + step;
    if (1 <= newValue && newValue <= 5) {
      setFormState({
        ...formState,
        priority: formState.priority + step,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitConfirmOpen(true);
  };

  const handleSubmitConfirmOk = async (history) => {
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
        showMessageSnackbar(true, "success", "?????????????????????");
        history.push("/todos/list");
      } catch (error) {
        showMessageSnackbar(true, "error", "??????????????????????????????");
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
        showMessageSnackbar(true, "success", "?????????????????????");
        history.push("/todos/list");
      } catch (error) {
        showMessageSnackbar(true, "error", "??????????????????????????????");
      }
    }
  };

  const createOrUpdate = id ? "??????" : "??????";

  const priorityStars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= formState.priority) {
      priorityStars.push(
        <IconButton
          onClick={() => handlePriorityStarClick(i)}
          className={classes.priorityStar}
        >
          <Star />
        </IconButton>
      );
    } else {
      priorityStars.push(
        <IconButton onClick={() => handlePriorityStarClick(i)}>
          <StarOutline />
        </IconButton>
      );
    }
  }

  const handlePriorityStarClick = (priority) => {
    setFormState({
      ...formState,
      priority: priority,
    });
  };

  return (
    <Container maxWidth="sm">
      <Card className={classes.card}>
        <ContentsTitle title={`Todo${createOrUpdate}`} />
        <Box mt={3} display="flex">
          <IconButton onClick={() => history.push("/todos/list")}>
            <List />
          </IconButton>
        </Box>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Box mt={2}>
            <Typography variant="h6">??????</Typography>
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
            <Typography variant="h6">??????</Typography>
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
            <Typography variant="h6">?????????</Typography>
            <Grid container>
              <Grid item xs={1}>
                <IconButton onClick={() => handlePriorityAdjust(-1)}>
                  <Remove />
                </IconButton>
              </Grid>
              <Grid item>{priorityStars}</Grid>
              <Grid item xs={1}>
                <IconButton onClick={() => handlePriorityAdjust(1)}>
                  <Add />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
          <Box mt={2}>
            <Typography variant="h6">??????</Typography>
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
      <ConfirmDialog
        open={submitConfirmOpen}
        onConfirmOk={() => handleSubmitConfirmOk(history)}
        onConfirmCancel={() => setSubmitConfirmOpen(false)}
      >
        <div
          style={{ fontSize: "1.1rem", whiteSpace: "pre-wrap" }}
        >{`${createOrUpdate}????????????\n????????????????????????`}</div>
      </ConfirmDialog>
    </Container>
  );
};

export default Edit;
