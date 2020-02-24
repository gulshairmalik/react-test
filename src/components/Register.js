import React from "react"
import {Avatar,Button,CssBaseline,TextField,Grid,Typography,Container,Radio,RadioGroup,FormHelperText,InputLabel,Select,FormControl,FormControlLabel,FormLabel,CircularProgress} from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import {makeStyles} from "@material-ui/core/styles"
import DateFnsUtils from "@date-io/date-fns"
import {MuiPickersUtilsProvider,KeyboardDatePicker} from "@material-ui/pickers"
import SuccessMsg from "./partials/SuccessMsg"

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(0.5),
    minWidth: 396
  },
}))

const Register = () => {

  const classes = useStyles()
  const [courseValue, setCourseValue] = React.useState("1")
  const [subjects, setSubjects] = React.useState(["Short Reports", "Annual Reports", "Presentations"])
  const [subjectValue, setSubjectValue] = React.useState("Select Subject")
  const [dateValue, setDateValue] = React.useState(new Date())
  const [labelWidth, setLabelWidth] = React.useState(0)
  const [isNotesErr, setIsNotesErr] = React.useState(false)
  const [isDateErr, setIsDateErr] = React.useState(true)
  const [error, setError] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const inputLabel = React.useRef(null)
  
 
  React.useEffect(() => setLabelWidth(inputLabel.current.offsetWidth), [])

  const handleCourseChange = event => {

    if(event.target.value==="1") setSubjects(["Short Reports", "Annual Reports", "Presentations"])
    else if(event.target.value==="2") setSubjects(["Poetry", "Short Stories", "Drama"])
    else if(event.target.value==="3") setSubjects(["Web Development", "Desktop Software Development", "Research and Analysis"])
    setCourseValue(event.target.value)

  }

  const handleSelectChange = event => setSubjectValue(event.target.value)

  const handleNotesChange = event => {
    if((event.target.value.length>0 && event.target.value.length<20) || event.target.value.length>50){setIsNotesErr(true);setError(true)}
    else if(event.target.value.length>=20 && event.target.value.length<=50){setIsNotesErr(false);setError(true)}
    else if(event.target.value.length===0){setIsNotesErr(false);setError(false)}
  }

  const handleSubmit = (event) => {
    event.preventDefault()
   if(!error){
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 3000)
   }
  }


  return (
    <Container component="main" maxWidth="xs">
      {success && <SuccessMsg />}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <FormLabel>Course</FormLabel>
                <br></br>
                <RadioGroup aria-label="course" name="course" value={courseValue} onChange={handleCourseChange}>
                  <FormControlLabel value="1" control={<Radio />} label="Technical Report Writing" />
                  <FormControlLabel value="2" control={<Radio />} label="English Literature" />
                  <FormControlLabel value="3" control={<Radio />} label="Computer Sciences" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel ref={inputLabel} htmlFor="outlined-subject-native-simple">
                Subject
              </InputLabel>
              <Select
                required
                native
                value={(subjectValue) || ""}
                onChange={handleSelectChange}
                labelWidth={labelWidth}
                inputProps={{
                  name: "Subject",
                  id: "outlined-subject-native-simple",
                }}
              >
                <option value=""></option>
                {
                  subjects.map(subject => (
                    <option value={subject} key={subject}>{subject}</option>
                  ))
                }
              </Select>
            </FormControl>
            </Grid>

            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  className={classes.formControl}
                  invalidDateMessage=""
                  margin="normal"
                  id="date-picker-dialog"
                  label="Start Date"
                  format="MM/dd/yyyy"
                  value={dateValue}
                  onChange={
                    date => {
                      setDateValue(date.toLocaleDateString())
                      if(date.toLocaleDateString()==="12/20/2019" || date.toLocaleDateString()==="1/15/2020" || date.toLocaleDateString()==="2/1/2020"){
                        setIsDateErr(false)
                        setError(false)
                      }else{
                        setIsDateErr(true)
                        setError(true)
                      }
                    }
                  }
                  required
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
                <FormHelperText
                  error={isDateErr}
                 >
                  {isDateErr ? "Your selected course and subject is not offered beginning from your selected date" : ""}
                </FormHelperText>
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.formControl}
                variant="outlined"
                label="Additional Notes"
                name="notes"
                autoComplete="notes"
                onChange={handleNotesChange}
                multiline
                rows={4}
                rowsMax={4}
                error={isNotesErr}
                helperText={isNotesErr ? "Notes length should be greater than 20 character & less than 50 characters" : ""}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            {loading ? <CircularProgress size={25} style={{marginLeft:"2%"}} /> : "Submit"}
          </Button>
        </form>
      </div>
    </Container>
  )
  
}

export default Register
