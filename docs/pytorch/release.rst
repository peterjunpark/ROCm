*********************
PyTorch release notes
*********************

PyTorch is an open-source tensor library designed for deep learning optimized
for AMD GPUs through ROCm libraries.

Key features and enhancements for PyTorch 2.9 with ROCm 7.1.1
=============================================================

- Scaled Dot Product Attention (SDPA) upgraded to use AOTriton version 0.11b.

- Default hipBLASLt support enabled for gfx908 architecture on ROCm 6.3 and later.

- MIOpen now supports channels last memory format for 3D convolutions and batch normalization.

- NHWC convolution operations in MIOpen optimized by eliminating unnecessary transpose operations.

- Improved tensor.item() performance by removing redundant synchronization.

- Enhanced performance for element-wise operations and reduction kernels.

- Added support for grouped GEMM operations through fbgemm_gpu generative AI components.

- Resolved device error in Inductor when using CUDA graph trees with HIP.

- Corrected logsumexp scaling in AOTriton-based SDPA implementation.

- Added stream graph capture status validation in memory copy synchronization functions.

Supported operating systems
===========================

Talk about newly added support and changes to compatibility.

.. list-table::
   :header-rows: 1

   * - Operating system
     - Supported PyTorch versions

   * - Linux
     - **2.9.1**, **2.8.0**, **2.7.1**

   * - Windows
     - **2.9.1**

Known issues
============

List known issues and workarounds here.
