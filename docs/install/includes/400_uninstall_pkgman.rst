1. Use your package manager to remove :ref:`ROCm meta packages <rocm-install-meta-packages>` installed on your system.

   .. selected:: os=ubuntu os=debian

      .. selected:: gpu=mi355x gpu=mi350x

         .. code-block:: bash

            sudo apt autoremove amdrocm7.12-gfx950

      .. selected:: gpu=mi325x gpu=mi300x gpu=mi300a

         .. code-block:: bash

            sudo apt autoremove amdrocm7.12-gfx94x

      .. selected:: gpu=mi250x gpu=mi250 gpu=mi210

         .. code-block:: bash

            sudo apt autoremove amdrocm7.12-gfx90a

      .. selected:: gpu=mi100

         .. code-block:: bash

            sudo apt autoremove amdrocm7.12-gfx908

      .. selected:: gpu=ai-r9700 gpu=ai-r9600d gpu=rx-9070-xt gpu=rx-9070-gre gpu=rx-9070 gpu=rx-9060-xt-lp gpu=rx-9060-xt gpu=rx-9060

         .. code-block:: bash

            sudo apt autoremove amdrocm7.12-gfx120x

      .. selected:: gpu=w7900-dual-slot gpu=w7900 gpu=w7800-48gb gpu=w7800 gpu=w7700 gpu=v710 gpu=rx-7900-xtx gpu=rx-7900-xt gpu=rx-7900-gre gpu=rx-7800-xt gpu=rx-7700-xt gpu=rx-7700-xe gpu=rx-7700 gpu=rx-7600 gpu=9-270 gpu=7-260 gpu=7-250 gpu=5-240 gpu=5-230 gpu=5-220 gpu=3-210

         .. code-block:: bash

            sudo apt autoremove amdrocm7.12-gfx110x

      .. selected:: gpu=w6800 gpu=v620

         .. code-block:: bash

            sudo apt autoremove amdrocm7.12-gfx103x

      .. selected:: gpu=max-pro-395 gpu=max-pro-390 gpu=max-pro-385 gpu=max-pro-380 gpu=max-395 gpu=max-390 gpu=max-385

         .. code-block:: bash

            sudo apt autoremove amdrocm7.12-gfx1151

      .. selected:: gpu=9-hx-pro-475 gpu=9-hx-pro-470 gpu=9-pro-465 gpu=7-pro-450 gpu=5-pro-440 gpu=5-pro-435 gpu=9-hx-375 gpu=9-hx-370 gpu=9-365

         .. code-block:: bash

            sudo apt autoremove amdrocm7.12-gfx1150

   .. selected:: os=rhel os=oracle-linux os=rocky-linux

      .. selected:: gpu=mi355x gpu=mi350x

         .. code-block:: bash

            sudo dnf remove amdrocm7.12-gfx950

      .. selected:: gpu=mi325x gpu=mi300x gpu=mi300a

         .. code-block:: bash

            sudo dnf remove amdrocm7.12-gfx94x

      .. selected:: gpu=mi250x gpu=mi250 gpu=mi210

         .. code-block:: bash

            sudo dnf remove amdrocm7.12-gfx90a

      .. selected:: gpu=mi100

         .. code-block:: bash

            sudo dnf remove amdrocm7.12-gfx908

      .. selected:: gpu=ai-r9700 gpu=ai-r9600d gpu=rx-9070-xt gpu=rx-9070-gre gpu=rx-9070 gpu=rx-9060-xt-lp gpu=rx-9060-xt gpu=rx-9060

         .. code-block:: bash

            sudo dnf remove amdrocm7.12-gfx120x

      .. selected:: gpu=w7900-dual-slot gpu=w7900 gpu=w7800-48gb gpu=w7800 gpu=w7700 gpu=v710 gpu=rx-7900-xtx gpu=rx-7900-xt gpu=rx-7900-gre gpu=rx-7800-xt gpu=rx-7700-xt gpu=rx-7700-xe gpu=rx-7700 gpu=rx-7600

         .. code-block:: bash

            sudo dnf remove amdrocm7.12-gfx110x

      .. selected:: gpu=w6800 gpu=v620

         .. code-block:: bash

            sudo dnf remove amdrocm7.12-gfx103x

   .. selected:: os=sles

      .. code-block:: bash

         sudo zypper remove amdrocm*

2. Remove ROCm repositories.

   .. selected:: os=ubuntu os=debian

      .. code-block:: bash

         # Remove ROCm repositories
         sudo rm /etc/apt/sources.list.d/rocm.list

         # Clear the cache and clean the system
         sudo rm -rf /var/cache/apt/*
         sudo apt clean all
         sudo apt update

   .. selected:: os=rhel os=oracle-linux os=rocky-linux

      .. code-block:: bash

         # Remove ROCm repositories
         sudo rm /etc/yum.repos.d/rocm.repo*

         # Clear the cache and clean the system
         sudo rm -rf /var/cache/dnf
         sudo dnf clean all

   .. selected:: os=sles

      .. code-block:: bash

         # Remove ROCm repositories
         sudo zypper removerepo "rocm"

         # Clear the cache and clean the system
         sudo zypper clean --all
         sudo zypper refresh
