import React from 'react';
import './DetailInfo.css';
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
    border: "none",
    marginBottom: "10px"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const DetailInfo = ({title, vaccineFile, testFile, dataSymptom}) => {
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
                  Vaccination: {testFile? <a href={testFile}>Link</a> : "Empty"} <br/>
                </Typography>
                </AccordionDetails>
                <AccordionDetails>
                <Typography>
                  Swab/Antigen/PCR/Rapid Test: {vaccineFile? <a href={vaccineFile}>Link</a> : "Empty"}
                </Typography>
                </AccordionDetails>
                <AccordionDetails>
                <Typography>
                  Symptom: {dataSymptom? dataSymptom : "Empty"}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
    )
}

export default DetailInfo;
