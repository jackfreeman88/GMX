import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useState } from 'react';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function CustomDatePicker(props) {
    const [open, setOpen] = useState(false);
    return (
        <ThemeProvider theme={darkTheme}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                {props.responsive ?
                    <DatePicker
                        inputFormat="DD MMM 'YY"
                        disableFuture={props.disableFutureDates}
                        disablePast={props.disablePastDates}
                        label=""
                        openTo="day"
                        views={['year', 'month', 'day']}
                        open={open}
                        onOpen={() => setOpen(true)}
                        onClose={() => setOpen(false)}
                        closeOnSelect={true}
                        value={props.selectedDate}
                        onChange={props.handleOnChange}
                        renderInput={({ inputRef, inputProps, InputProps }) => (
                            <>
                                <input ref={inputRef} {...inputProps} className="form-control mw-100" onClick={(e) => setOpen(true)} onKeyDown={(e) => e.preventDefault()
                                } />
                            </>
                        )}
                    />
                    :
                    <MobileDatePicker
                        inputFormat="DD MMM 'YY"
                        disableFuture={props.disableFutureDates}
                        disablePast={props.disablePastDates}
                        label=""
                        openTo="day"
                        views={['year', 'month', 'day']}
                        open={open}
                        onOpen={() => setOpen(true)}
                        onClose={() => setOpen(false)}
                        closeOnSelect={true}
                        value={props.selectedDate}
                        onChange={props.handleOnChange}
                        renderInput={({ inputRef, inputProps, InputProps }) => (
                            <>
                                <input ref={inputRef} {...inputProps} className="form-control mw-100" onClick={(e) => setOpen(true)} onKeyDown={(e) => e.preventDefault()
                                } />
                            </>
                        )}
                    />
                }
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default CustomDatePicker;