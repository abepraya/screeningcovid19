import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import "./ModalInfo.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ModalInfo = ({setOpen, open, title, bodyText, footerText}) => {
    const classes = useStyles();

    function closeHandler(){
        setOpen(false);
    }
    // function openHandler(){
    //     setOpen(true);
    // }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={closeHandler}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <h4 id="transition-modal-title">{title}</h4>
          <p id="transition-modal-description">
            {bodyText}
          </p>
          <p>
            {footerText}
          </p>
        </div>
      </Fade>
    </Modal>
  );
};

export default ModalInfo;
