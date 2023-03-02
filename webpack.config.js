module.exports = {
    // ...
    module: {
      rules: [
        // ...
        {
          test: /\.xlsm$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'static/',
              },
            },
          ],
        },
      ],
    },
    // ...
  };
  