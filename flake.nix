{
  inputs = {
    nixpkgs.url = "github:cachix/devenv-nixpkgs/rolling";
    systems.url = "github:nix-systems/default";
    devenv.url = "github:cachix/devenv";
    devenv.inputs.nixpkgs.follows = "nixpkgs";
  };

  nixConfig = {
    extra-trusted-public-keys = "devenv.cachix.org-1:w1cLUi8dv3hnoSPGAuibQv+f9TZLr6cv/Hm9XgU50cw=";
    extra-substituters = "https://devenv.cachix.org";
  };

  outputs = { self, nixpkgs, devenv, systems, ... } @ inputs:
    let
      forEachSystem = nixpkgs.lib.genAttrs (import systems);
    in
    {
      packages = forEachSystem (system: {
        devenv-up = self.devShells.${system}.default.config.procfileScript;
      });

      devShells = forEachSystem
        (system:
          let
            pkgs = nixpkgs.legacyPackages.${system};
          in
          {
            default = devenv.lib.mkShell {
              inherit inputs pkgs;
              modules = [
                {
                  # languages
                  languages.python = {
                    enable = true;
                    poetry = {
                      enable = true;
                      activate.enable = true;
                      install.enable = true;
                    };
                  };
                  languages.javascript = {
                    enable = true;
                    bun.enable = true;
                  };
                  languages.typescript.enable = true;

                  # postgres database
                  services.postgres = {
                    enable = true;
                    listen_addresses = "127.0.0.1";
                    port = 5432;
                  };

                  # dev processes
                  processes = {
                    dev-backend.exec = ''
                      cd $PWD/backend
                      poetry install --no-root
                      poetry run uvicorn main:app --reload
                    '';
                    dev-frontend.exec = ''
                      cd $PWD/frontend
                      bun i
                      bun dev
                    '';
                  };

                  enterShell = ''
                    # Error handler
                    error_handler() {
                      echo "💥 An error occured while setting up the environment"
                      echo "🔥 Please check the logs above for more information"
                      echo "🚨 Activate the devenv shell again after fixing the error"
                      exit 1
                    }
                    trap 'error_handler $?' ERR

                    echo "🔧 Setting up the environment..."

                    # Judge0 dockers
                    echo "🦈 Initializing judge0 docker containers..."
                    docker compose up -d db redis
                    docker compose up -d

                    echo "✨ Development environment is ready"
                    echo "🚀 Run 'devenv up' to start the services"
                  '';
                }
              ];
            };
          });
    };
}
