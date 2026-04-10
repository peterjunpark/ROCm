1. Clear the pip cache.

   .. selected:: os=ubuntu os=debian os=rhel os=oracle-linux os=rocky-linux os=sles

      .. code-block:: bash

         sudo rm -rf ~/.cache/pip

   .. selected:: os=windows

      .. code-block:: bat

         pip cache purge

2. Remove your local Python virtual environment.

   .. selected:: os=ubuntu os=debian os=rhel os=oracle-linux os=rocky-linux os=sles

      .. code-block:: bash

         sudo rm -rf .venv

   .. selected:: os=windows

      .. code-block:: bat

         rmdir /s /q .venv
