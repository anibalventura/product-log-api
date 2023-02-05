import morganBody, { IMorganBodyOptions } from 'morgan-body';
import path from 'path';
import { RotatingFileStream, createStream } from 'rotating-file-stream';
import moment from 'moment';

const options: IMorganBodyOptions = {
  dateTimeFormat: 'iso',
};

// Create a rotating write stream.
const logFileStream: RotatingFileStream = createStream(
  moment(new Date()).format('YYYY-MM-DD') + '.log',
  {
    interval: '1d', // Rotate daily.
    path: path.join('./', 'logs'),
  }
);

export default (app: any) => {
  // Log to a file.
  morganBody(app, { ...options, stream: logFileStream });

  // Log to the console.
  morganBody(app, { ...options, theme: 'darkened' });
};
