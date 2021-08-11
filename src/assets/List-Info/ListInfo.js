import React from 'react';
import './ListInfo.css';
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
    border: "none",
    marginBottom: "10px"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const ListInfo = ({title, description, image, author, date}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>{title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {description}
                </Typography>
                {(author && date) && (<div className="content-container">
                    <div className="content-description">
                        <p><i className="fas fa-user-alt" />{author}<br/></p>
                        <p><i className="fas fa-calendar" />{date}</p>
                    </div>
                <img src={image} />
                </div>)}
              </AccordionDetails>
            </Accordion>
          </div>
    )
}

export default ListInfo;
