import app from './app';

// Start server.
app.listen(process.env.PORT, () => {
  console.log(
    `Server running with ${process.env.NODE_ENV} environment on http://localhost:${process.env.PORT}/api`
  );
});
