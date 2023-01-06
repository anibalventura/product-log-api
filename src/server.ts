import app from './app';
import config from './config';

// Start server.
app.listen(3000, () => {
  console.log(
    `Server running with ${config.env} environment on http://localhost:${config.port}/api`
  );
});
