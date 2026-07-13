.. meta::
   :description: Install ROCm to run high-performance computing (HPC) workloads.
   :keywords: ROCm, HPC, install, installation, Linux, AMD Instinct

.. _hpc-install:

***********************
Install ROCm HPC-SDK
***********************
AMD ROCm™ HPC-SDK provides high-performance computing libraries and tools for AMD GPU
architectures. This guide walks you through installing the HPC-SDK alongside ROCm installation
on a supported Linux distribution.

The ROCm for HPC applications and containers run on a standard ROCm installation.
Install ROCm on a supported Linux distribution before running any of the HPC
applications under the HPC application catalog. 

* `Install ROCm on Linux <https://rocm.docs.amd.com/projects/install-on-linux/en/latest/>`_

* See the
  `Compatibility matrix <https://rocm.docs.amd.com/en/latest/compatibility/compatibility-matrix.html>`_
  for details on supported hardware and operating systems.

The HPC application containers are published through
`AMD InfinityHub-CI <https://github.com/amd/InfinityHub-CI>`_. Each container
provides parameters to specify source code branches and release versions of ROCm,
OpenMPI, UCX, and Ubuntu.

Supported configurations
-------------------------

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Component
     - Supported options
   * - Device family
     - AMD Instinct, AMD Radeon, AMD Ryzen
   * - Linux distribution
     - Ubuntu, Debian, RHEL, Oracle Linux, SLES
   * - Installation method
     - Package manager, Tarball

Before you begin
-----------------

Before installing the HPC-SDK, make sure your system meets the ROCm hardware,
software, and driver requirements. For instructions, see :ref:`Install AMD ROCm <rocm-install-selector>`. Use the
selector panel on that page to view instructions appropriate for your system
environment.

HPC-SDK includes `hipTensor <https://rocm.docs.amd.com/projects/hipTensor/en/latest/>`_ and `rocALUTION <https://rocm.docs.amd.com/projects/rocALUTION/en/latest/>`_ packaged as part of the installation.

Install HPC-SDK
---------------------

1. Complete the :ref:`ROCm installation prerequisites <rocm-prerequisites>` to
   install dependencies and configure GPU access permissions.

2. Choose an installation method:

   .. tab-set::

      .. tab-item:: Package manager

         The package name depends on whether you want to install the HPC-SDK for all supported
         GPU architectures or for a specific one.

         .. tab-set::

            .. tab-item:: All GPUs

               Use the following command to install HPC-SDK for all GPU architectures:

               .. tab-set::

                    .. tab-item:: Ubuntu/Debian

                        .. code-block:: bash

                            sudo apt install amdrocm-hpc7.14 amdrocm-hpc-sdk7.14

                    .. tab-item:: RHEL/Oracle Linux

                        .. code-block:: bash

                            sudo dnf install amdrocm-hpc7.14 amdrocm-hpc-sdk7.14

                    .. tab-item:: SLES

                        .. code-block:: bash

                            sudo zypper install amdrocm-hpc7.14 amdrocm-hpc-sdk7.14

            .. tab-item:: Specific GPUs

               Use the following command to install HPC-SDK for on specific supported GPU architectures. In the commands below,replace ``gfxXYZ`` with your GPU architecture identifier (for example, ``gfx942`` or ``gfx950``):

               .. tab-set::

                    .. tab-item:: Ubuntu/Debian

                        .. code-block:: bash

                            sudo apt install amdrocm-hpc7.14-gfxXYZ amdrocm-hpc-sdk7.14-gfxXYZ

                    .. tab-item:: RHEL/Oracle Linux

                        .. code-block:: bash

                            sudo dnf install amdrocm-hpc7.14-gfxXYZ amdrocm-hpc-sdk7.14-gfxXYZ

                    .. tab-item:: SLES

                        .. code-block:: bash

                            sudo zypper install amdrocm-hpc7.14-gfxXYZ amdrocm-hpc-sdk7.14-gfxXYZ

      .. tab-item:: Tarball

         The standard ROCm tarball installation includes the HPC-SDK. No additional steps are required. For details on ROCm tarball installation, refer to :ref:`Install AMD ROCm <rocm-install>` and select Tarball installation method from installation environment selector.

Uninstall HPC-SDK
----------------------

Choose the appropriate method for uninstalling HPC-SDK:

.. tab-set::

      .. tab-item:: Package manager

         The package name depends on whether you want to install the HPC-SDK for all supported
         GPU architectures or for a specific one.

         .. tab-set::

            .. tab-item:: All GPUs

               Use the following command to uninstall HPC-SDK for all GPU architectures:

               .. tab-set::

                    .. tab-item:: Ubuntu/Debian

                        .. code-block:: bash

                            sudo apt autoremove amdrocm-hpc7.14 amdrocm-hpc-sdk7.14

                    .. tab-item:: RHEL/Oracle Linux

                        .. code-block:: bash

                            sudo dnf remove amdrocm-hpc7.14 amdrocm-hpc-sdk7.14

                    .. tab-item:: SLES

                        .. code-block:: bash

                            sudo zypper remove amdrocm-hpc7.14 amdrocm-hpc-sdk7.14

            .. tab-item:: Specific GPUs

               Use the following command to uninstall HPC-SDK for on specific supported GPU architectures. In the commands below,replace ``gfxXYZ`` with your GPU architecture identifier (for example, ``gfx942`` or ``gfx950``):

               .. tab-set::

                    .. tab-item:: Ubuntu/Debian

                        .. code-block:: bash

                            sudo apt autoremove amdrocm-hpc7.14-gfxXYZ amdrocm-hpc-sdk7.14-gfxXYZ

                    .. tab-item:: RHEL/Oracle Linux

                        .. code-block:: bash

                            sudo dnf remove amdrocm-hpc7.14-gfxXYZ amdrocm-hpc-sdk7.14-gfxXYZ

                    .. tab-item:: SLES

                        .. code-block:: bash

                            sudo zypper remove amdrocm-hpc7.14-gfxXYZ amdrocm-hpc-sdk7.14-gfxXYZ

      .. tab-item:: Tarball

        The standard ROCm uninstallation process can be followed to uninstall HPC-SDK. No additional steps are required
        to remove the HPC-SDK separately. Refer to :ref:`Uninstalling <rocm-uninstall>` section and select Tarball from the installation environment selector. 