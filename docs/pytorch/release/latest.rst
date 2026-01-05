*********************
PyTorch release notes
*********************

The following sections summarize enabled features, enhanced capabilities, and
any known issues for ROCm-enabled PyTorch releases.

PyTorch 2.9 with ROCm 7.1.1
===========================

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

PyTorch 2.8 with ROCm 7.1
=========================

- MIOpen deep learning optimizations: Further optimized NHWC BatchNorm feature.

- Added float8 support for the DeepSpeed extension, allowing for decreased
  memory footprint and increased throughput in training and inference workloads.

- ``torch.nn.functional.scaled_dot_product_attention`` now calling optimized
  flash attention kernel automatically.

Known issues
------------

- The ``matmul.allow_fp16_reduced_precision_reduction`` and
  ``matmul.allow_bf16_reduced_precision_reduction`` options under
  ``torch.backends.cuda`` are not supported. As a result,
  reduced-precision reductions using FP16 or BF16 accumulation types are not
  available.

PyTorch 2.7/2.8 with ROCm 7.0
=============================

- Enhanced TunableOp framework: Introduces ``tensorfloat32`` support for
  TunableOp operations, improved offline tuning for ScaledGEMM operations,
  submatrix offline tuning capabilities, and better logging for BLAS operations
  without bias vectors.

- Expanded GPU architecture support: Provides optimized support for newer GPU
  architectures, including gfx1200 and gfx1201 with preferred hipBLASLt backend
  selection, along with improvements for gfx950 and gfx1100 Series GPUs.

- Advanced Triton Integration: AOTriton 0.10b introduces official support for
  gfx950 and gfx1201, along with experimental support for gfx1101, gfx1151,
  gfx1150, and gfx1200.

- Improved element-wise kernel performance: Delivers enhanced vectorized
  element-wise kernels with better support for heterogeneous tensor types and
  optimized input vectorization for tensors with mixed data types.

- MIOpen deep learning optimizations: Enables NHWC BatchNorm by default on
  ROCm 7.0+, provides ``maxpool`` forward and backward performance improvements
  targeting ResNet scenarios, and includes updated launch configurations for
  better performance.

- Enhanced memory and tensor operations: Features fixes for in-place ``aten``
  sum operations with specialized templated kernels, improved 3D tensor
  performance with NHWC format, and better handling of memory-bound matrix
  multiplication operations.

- Robust testing and quality improvements: Includes comprehensive test suite
  updates with improved tolerance handling for Navi3x architectures, generalized
  ROCm-specific test conditions, and enhanced unit test coverage for Flash
  Attention and Memory Efficient operations.

- Composable Kernel (CK) updates: Features updated CK submodule integration with
  the latest optimizations and performance improvements for core mathematical
  operations.

- Development and debugging enhancements: Includes improved source handling for
  dynamic compilation, better error handling for atomic operations, and enhanced
  state checking for trace operations.

- Integrate APEX fused layer normalization, which can have positive impact on
  text-to-video models.

- Integrate APEX distributed fused LAMB and distributed fused ADAM, which can
  have positive impact on BERT-L and Llama2-SFT.

- FlashAttention v3 has been integrated for AMD GPUs.

- `Pytorch C++ extensions <https://pytorch.org/tutorials/advanced/cpp_extension.html>`_
  provide a mechanism for compiling custom operations that can be used during
  network training or inference. For AMD platforms, ``amdclang++`` has been
  validated as the supported compiler for building these extensions.

Known issues
------------

- The ``matmul.allow_fp16_reduced_precision_reduction`` and
  ``matmul.allow_bf16_reduced_precision_reduction`` options under
  ``torch.backends.cuda`` are not supported. As a result,
  reduced-precision reductions using FP16 or BF16 accumulation types are not
  available.
