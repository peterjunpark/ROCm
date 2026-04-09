.. selected:: i=tar

   .. selected:: os=ubuntu os=debian os=rhel os=oracle-linux os=rocky-linux os=sles

      1. To uninstall ROCm, remove your installation directory.

         .. important::

            The following command assumes you’re working with the
            ``therock-tarball`` directory. If you chose a different directory
            name when :ref:`installing ROCm <rocm-install>`, adjust the command
            accordingly.

         .. code-block:: bash

            sudo rm -rf therock-tarball

      2. Remove your ROCm environment configuration from your system.

         .. tab-set::

            .. tab-item:: System-wide 
               :sync: tarball-system-setup

               If you opted for a :ref:`system-wide setup
               <rocm-post-install-system-wide>` during the installation
               process, remove the ROCm environment variables.

               .. code-block:: bash

                  sudo rm -f /etc/profile.d/set-rocm-env.sh

            .. tab-item:: User
               :sync: tarball-user-setup

               If you opted for a :ref:`user-specific setup
               <rocm-post-install-system-wide>` during the installation
               process, remove the ROCm environment configuration block from
               your shell configuration file (``~/.bashrc`` or ``~/.profile``).

   .. selected:: os=windows

      1. To uninstall ROCm, remove your installation directory.

         .. code-block:: bat

            rmdir /s /q C:\TheRock

         .. important::

            This step assumes you’re working with the ``C:\TheRock\build``
            directory. If you chose a different directory name when
            :ref:`installing ROCm <rocm-install>`, adjust this step
            accordingly.

      2. **Run command prompt as an administrator** and delete the following environment variables.

         .. code-block:: bat

            setx HIP_DEVICE_LIB_PATH "" /M
            setx HIP_PATH "" /M
            setx HIP_PLATFORM "" /M
            setx LLVM_PATH "" /M

         Remove the following paths from your PATH environment variable using your system settings GUI.
         Navigate to the following screen:

         * Control Panel > System and Security > Edit environment variables

         Edit the PATH variable and delete the following paths:

         * ``C:\TheRock\build\bin``

         * ``C:\TheRock\build\lib\llvm\bin``

      3. To uninstall the Adrenalin Driver, see `Uninstall AMD Software
         <https://www.amd.com/en/resources/support-articles/faqs/RSX2-UNINSTALL.html>`__.
