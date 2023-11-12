/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    webpack: (config, { isServer }) => {
      // Adicione a configuração do file-loader apenas para os arquivos de áudio
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              emitFile: isServer ? false : true,
            },
          },
        ],
      });
  
      return config;
    },
  };
