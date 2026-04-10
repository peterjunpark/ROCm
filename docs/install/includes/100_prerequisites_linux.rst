.. selected:: os=ubuntu os=debian os=rhel os=oracle-linux os=rocky-linux os=sles

   Before installing the ROCm Core SDK |ROCM_VERSION|, ensure your system meets
   all prerequisites. This includes installing the required dependencies and
   configuring permissions for GPU access. To confirm that your system is
   supported, see the :doc:`Compatibility matrix
   </compatibility/compatibility-matrix>`.

   .. dropdown:: Install essential packages for Docker containers
      :animate: fade-in-slide-down
      :color: info
      :icon: tools
      :chevron: down-up

      Docker images often include only a minimal set of installations, so some
      essential packages might be missing. When installing ROCm within a Docker
      container, you might need to install additional packages for a successful
      installation.

      If applicable, run the following command to install essential packages:

      .. selected:: os=ubuntu os=debian

         .. selected:: i=pkgman

            .. code-block:: bash

               apt update
               apt install sudo wget

         .. selected:: i=pip

            .. code-block:: bash

               apt update
               apt install sudo cmake libgfortran5

         .. selected:: i=tar i=runfile

            .. code-block:: bash

               apt update
               apt install sudo wget python3

      .. selected:: os=rhel os=rocky-linux os=oracle-linux

         .. code-block:: bash

            dnf install sudo wget

      .. selected:: os=sles

         .. selected:: i=pkgman

            .. code-block:: bash

               zypper install sudo wget SUSEConnect

         .. selected:: i=pip

            .. code-block:: bash

               zypper install sudo wget cmake libgfortran5

         .. selected:: i=tar i=runfile

            .. code-block:: bash

               zypper install sudo wget
