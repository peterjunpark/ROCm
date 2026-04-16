*************
ROCm packages
*************

When installing ROCm using your Linux distribution's package manager.

.. matrix::

   .. matrix-head::

      .. matrix-row::
         :header:

         .. matrix-cell:: Component group

         .. matrix-cell:: Component name

         .. matrix-cell:: Linux support

         .. matrix-cell:: Windows support

         .. matrix-cell:: Package names

   .. matrix-row::

      .. matrix-cell:: Core Runtime & Compiler
         :rowspan: 4

      .. matrix-cell:: ROCR-Runtime

      .. matrix-cell:: Yes (Instinct, Radeon, Ryzen)

      .. matrix-cell:: No

      .. matrix-cell::

         | ``amdrocm-runtime-dev7.12``
         | ``amdrocm-runtime-dev``
         | ``amdrocm-runtime7.12``
         | ``amdrocm-runtime``

   .. matrix-row::

      .. matrix-cell:: HIP

      .. matrix-cell:: Yes (Instinct, Radeon, Ryzen)

      .. matrix-cell:: Yes (Radeon, Ryzen)

      .. matrix-cell::

         | ``amdrocm-runtime-dev7.12``
         | ``amdrocm-runtime-dev``
         | ``amdrocm-runtime7.12``
         | ``amdrocm-runtime``

   .. matrix-row::

      .. matrix-cell:: LLVM

      .. matrix-cell:: Yes (Instinct, Radeon, Ryzen)

      .. matrix-cell:: Yes (Radeon, Ryzen)

      .. matrix-cell::

         | ``amdrocm-runtime-dev7.12``
         | ``amdrocm-runtime-dev``
         | ``amdrocm-runtime7.12``
         | ``amdrocm-runtime``

   .. matrix-row::

      .. matrix-cell:: HIPIFY

      .. matrix-cell:: Yes (Instinct, Radeon, Ryzen)

      .. matrix-cell:: Yes (Radeon, Ryzen)

      .. matrix-cell::

         | ``amdrocm-hipify7.12``
         | ``amdrocm-hipify``

   .. matrix-row::

      .. matrix-cell:: System Utilities, Debugging and Profiling
         :rowspan: 7

      .. matrix-cell:: ROCProfiler-SDK

      .. matrix-cell:: Yes (Instinct and Radeon: Navi31/32/33, Navi44/48, Navi21)

      .. matrix-cell:: No

      .. matrix-cell::

         | ``amdrocm-profiler-base7.12``
         | ``amdrocm-profiler-base``

   .. matrix-row::

      .. matrix-cell:: rocprof-compute

      .. matrix-cell:: Yes (Instinct only)

      .. matrix-cell:: No

      .. matrix-cell::

         | ``amdrocm-profiler7.12``
         | ``amdrocm-profiler``

   .. matrix-row::

      .. matrix-cell:: rocprof-systems

      .. matrix-cell:: Yes (Instinct only)

      .. matrix-cell:: No

      .. matrix-cell::

         | ``amdrocm-profiler7.12``
         | ``amdrocm-profiler``

   .. matrix-row::

      .. matrix-cell:: rocminfo

      .. matrix-cell:: Yes (Instinct, Radeon, Ryzen)

      .. matrix-cell:: No

      .. matrix-cell::

         ``amdrocm-base7.12``

   .. matrix-row::

      .. matrix-cell:: hipinfo

      .. matrix-cell:: No

      .. matrix-cell:: Yes

      .. matrix-cell::

         | ``amdrocm-base7.12``
         | ``amdrocm-base``

   .. matrix-row::

      .. matrix-cell:: AMD SMI SRIOV Host

      .. matrix-cell:: Yes (Instinct and Radeon DC boards)

      .. matrix-cell:: Yes (Radeon DC boards + MI300)

      .. matrix-cell::

   .. matrix-row::

      .. matrix-cell:: SPIRV-LLVM-Translator

      .. matrix-cell:: Yes (Instinct, Radeon, Ryzen)

      .. matrix-cell:: Yes (Radeon, Ryzen)

      .. matrix-cell::

   .. matrix-row::

      .. matrix-cell:: Debug Tools
         :rowspan: 3

      .. matrix-cell:: ROCr Debug Agent

      .. matrix-cell:: Yes (Instinct and Radeon: Navi44/48, Navi31/32/33)

      .. matrix-cell:: No

      .. matrix-cell::

         | ``amdrocm-debugger7.12``
         | ``amdrocm-debugger``

   .. matrix-row::

      .. matrix-cell:: ROCdbgapi

      .. matrix-cell:: Yes (Instinct and Radeon: Navi44/48, Navi31/32/33)

      .. matrix-cell:: No

      .. matrix-cell::

         | ``amdrocm-debugger7.12``
         | ``amdrocm-debugger``

   .. matrix-row::

      .. matrix-cell:: ROCgdb

      .. matrix-cell:: Yes (Instinct and Radeon: Navi44/48, Navi31/32/33)

      .. matrix-cell:: No

      .. matrix-cell::

         | ``amdrocm-debugger7.12``
         | ``amdrocm-debugger``

   .. matrix-row::

      .. matrix-cell:: Math & Compute Libraries
         :rowspan: 16

      .. matrix-cell:: rocBLAS

      .. matrix-cell:: Yes (Instinct, Radeon, Ryzen)

      .. matrix-cell:: Yes (Radeon, Ryzen)

      .. matrix-cell::

         | ``amdrocm-blas-dev-gfx110x``
         | ``amdrocm-blas-dev-gfx1150``
         | ``amdrocm-blas-dev-gfx1151``
         | ``amdrocm-blas-dev-gfx1152``
         | ``amdrocm-blas-dev-gfx120x``
         | ``amdrocm-blas-dev-gfx908``
         | ``amdrocm-blas-dev-gfx90a``
         | ``amdrocm-blas-dev-gfx94x``
         | ``amdrocm-blas-dev-gfx950``
         | ``amdrocm-blas-dev7.12-gfx110x``
         | ``amdrocm-blas-dev7.12-gfx1150``
         | ``amdrocm-blas-dev7.12-gfx1151``
         | ``amdrocm-blas-dev7.12-gfx1152``
         | ``amdrocm-blas-dev7.12-gfx120x``
         | ``amdrocm-blas-dev7.12-gfx908``
         | ``amdrocm-blas-dev7.12-gfx90a``
         | ``amdrocm-blas-dev7.12-gfx94x``
         | ``amdrocm-blas-dev7.12-gfx950``
         | ``amdrocm-blas-gfx110x``
         | ``amdrocm-blas-gfx1150``
         | ``amdrocm-blas-gfx1151``
         | ``amdrocm-blas-gfx1152``
         | ``amdrocm-blas-gfx120x``
         | ``amdrocm-blas-gfx908``
         | ``amdrocm-blas-gfx90a``
         | ``amdrocm-blas-gfx94x``
         | ``amdrocm-blas-gfx950``
         | ``amdrocm-blas7.12-gfx110x``
         | ``amdrocm-blas7.12-gfx1150``
         | ``amdrocm-blas7.12-gfx1151``
         | ``amdrocm-blas7.12-gfx1152``
         | ``amdrocm-blas7.12-gfx120x``
         | ``amdrocm-blas7.12-gfx908``
         | ``amdrocm-blas7.12-gfx90a``
         | ``amdrocm-blas7.12-gfx94x``
         | ``amdrocm-blas7.12-gfx950``

   .. matrix-row::

      .. matrix-cell:: hipBLAS

      .. matrix-cell:: Yes (Instinct, Radeon, Ryzen)

      .. matrix-cell:: Yes (Radeon, Ryzen)

      .. matrix-cell::

         | ``amdrocm-blas-dev-gfx110x``
         | ``amdrocm-blas-dev-gfx1150``
         | ``amdrocm-blas-dev-gfx1151``
         | ``amdrocm-blas-dev-gfx1152``
         | ``amdrocm-blas-dev-gfx120x``
         | ``amdrocm-blas-dev-gfx908``
         | ``amdrocm-blas-dev-gfx90a``
         | ``amdrocm-blas-dev-gfx94x``
         | ``amdrocm-blas-dev-gfx950``
         | ``amdrocm-blas-dev7.12-gfx110x``
         | ``amdrocm-blas-dev7.12-gfx1150``
         | ``amdrocm-blas-dev7.12-gfx1151``
         | ``amdrocm-blas-dev7.12-gfx1152``
         | ``amdrocm-blas-dev7.12-gfx120x``
         | ``amdrocm-blas-dev7.12-gfx908``
         | ``amdrocm-blas-dev7.12-gfx90a``
         | ``amdrocm-blas-dev7.12-gfx94x``
         | ``amdrocm-blas-dev7.12-gfx950``
         | ``amdrocm-blas-gfx110x``
         | ``amdrocm-blas-gfx1150``
         | ``amdrocm-blas-gfx1151``
         | ``amdrocm-blas-gfx1152``
         | ``amdrocm-blas-gfx120x``
         | ``amdrocm-blas-gfx908``
         | ``amdrocm-blas-gfx90a``
         | ``amdrocm-blas-gfx94x``
         | ``amdrocm-blas-gfx950``
         | ``amdrocm-blas7.12-gfx110x``
         | ``amdrocm-blas7.12-gfx1150``
         | ``amdrocm-blas7.12-gfx1151``
         | ``amdrocm-blas7.12-gfx1152``
         | ``amdrocm-blas7.12-gfx120x``
         | ``amdrocm-blas7.12-gfx908``
         | ``amdrocm-blas7.12-gfx90a``
         | ``amdrocm-blas7.12-gfx94x``
         | ``amdrocm-blas7.12-gfx950``

   .. matrix-row::

      .. matrix-cell:: hipBLASLt

      .. matrix-cell:: Yes (Instinct, Radeon, Ryzen)

      .. matrix-cell:: Yes (Radeon, Ryzen)

      .. matrix-cell::

         | ``amdrocm-blas-dev-gfx110x``
         | ``amdrocm-blas-dev-gfx1150``
         | ``amdrocm-blas-dev-gfx1151``
         | ``amdrocm-blas-dev-gfx1152``
         | ``amdrocm-blas-dev-gfx120x``
         | ``amdrocm-blas-dev-gfx908``
         | ``amdrocm-blas-dev-gfx90a``
         | ``amdrocm-blas-dev-gfx94x``
         | ``amdrocm-blas-dev-gfx950``
         | ``amdrocm-blas-dev7.12-gfx110x``
         | ``amdrocm-blas-dev7.12-gfx1150``
         | ``amdrocm-blas-dev7.12-gfx1151``
         | ``amdrocm-blas-dev7.12-gfx1152``
         | ``amdrocm-blas-dev7.12-gfx120x``
         | ``amdrocm-blas-dev7.12-gfx908``
         | ``amdrocm-blas-dev7.12-gfx90a``
         | ``amdrocm-blas-dev7.12-gfx94x``
         | ``amdrocm-blas-dev7.12-gfx950``
         | ``amdrocm-blas-gfx110x``
         | ``amdrocm-blas-gfx1150``
         | ``amdrocm-blas-gfx1151``
         | ``amdrocm-blas-gfx1152``
         | ``amdrocm-blas-gfx120x``
         | ``amdrocm-blas-gfx908``
         | ``amdrocm-blas-gfx90a``
         | ``amdrocm-blas-gfx94x``
         | ``amdrocm-blas-gfx950``
         | ``amdrocm-blas7.12-gfx110x``
         | ``amdrocm-blas7.12-gfx1150``
         | ``amdrocm-blas7.12-gfx1151``
         | ``amdrocm-blas7.12-gfx1152``
         | ``amdrocm-blas7.12-gfx120x``
         | ``amdrocm-blas7.12-gfx908``
         | ``amdrocm-blas7.12-gfx90a``
         | ``amdrocm-blas7.12-gfx94x``
         | ``amdrocm-blas7.12-gfx950``

   .. matrix-row::

      .. matrix-cell:: rocFFT / hipFFT

      .. matrix-cell:: Yes (Instinct, Radeon, Ryzen)

      .. matrix-cell:: Yes (Radeon, Ryzen)

      .. matrix-cell::

         | ``amdrocm-fft-dev-gfx110x``
         | ``amdrocm-fft-dev-gfx1150``
         | ``amdrocm-fft-dev-gfx1151``
         | ``amdrocm-fft-dev-gfx1152``
         | ``amdrocm-fft-dev-gfx120x``
         | ``amdrocm-fft-dev-gfx908``
         | ``amdrocm-fft-dev-gfx90a``
         | ``amdrocm-fft-dev-gfx94x``
         | ``amdrocm-fft-dev-gfx950``
         | ``amdrocm-fft-dev7.12-gfx110x``
         | ``amdrocm-fft-dev7.12-gfx1150``
         | ``amdrocm-fft-dev7.12-gfx1151``
         | ``amdrocm-fft-dev7.12-gfx1152``
         | ``amdrocm-fft-dev7.12-gfx120x``
         | ``amdrocm-fft-dev7.12-gfx908``
         | ``amdrocm-fft-dev7.12-gfx90a``
         | ``amdrocm-fft-dev7.12-gfx94x``
         | ``amdrocm-fft-dev7.12-gfx950``
         | ``amdrocm-fft-gfx110x``
         | ``amdrocm-fft-gfx1150``
         | ``amdrocm-fft-gfx1151``
         | ``amdrocm-fft-gfx1152``
         | ``amdrocm-fft-gfx120x``
         | ``amdrocm-fft-gfx908``
         | ``amdrocm-fft-gfx90a``
         | ``amdrocm-fft-gfx94x``
         | ``amdrocm-fft-gfx950``
         | ``amdrocm-fft7.12-gfx110x``
         | ``amdrocm-fft7.12-gfx1150``
         | ``amdrocm-fft7.12-gfx1151``
         | ``amdrocm-fft7.12-gfx1152``
         | ``amdrocm-fft7.12-gfx120x``
         | ``amdrocm-fft7.12-gfx908``
         | ``amdrocm-fft7.12-gfx90a``
         | ``amdrocm-fft7.12-gfx94x``
         | ``amdrocm-fft7.12-gfx950``

   .. matrix-row::

      .. matrix-cell:: rocRAND

      .. matrix-cell:: Yes (Instinct, Radeon, Ryzen)

      .. matrix-cell:: Yes (Radeon, Ryzen)

      .. matrix-cell::

         | ``amdrocm-rand-dev-gfx110x``
         | ``amdrocm-rand-dev-gfx1150``
         | ``amdrocm-rand-dev-gfx1151``
         | ``amdrocm-rand-dev-gfx1152``
         | ``amdrocm-rand-dev-gfx120x``
         | ``amdrocm-rand-dev-gfx908``
         | ``amdrocm-rand-dev-gfx90a``
         | ``amdrocm-rand-dev-gfx94x``
         | ``amdrocm-rand-dev-gfx950``
         | ``amdrocm-rand-dev7.12-gfx110x``
         | ``amdrocm-rand-dev7.12-gfx1150``
         | ``amdrocm-rand-dev7.12-gfx1151``
         | ``amdrocm-rand-dev7.12-gfx1152``
         | ``amdrocm-rand-dev7.12-gfx120x``
         | ``amdrocm-rand-dev7.12-gfx908``
         | ``amdrocm-rand-dev7.12-gfx90a``
         | ``amdrocm-rand-dev7.12-gfx94x``
         | ``amdrocm-rand-dev7.12-gfx950``
         | ``amdrocm-rand-gfx110x``
         | ``amdrocm-rand-gfx1150``
         | ``amdrocm-rand-gfx1151``
         | ``amdrocm-rand-gfx1152``
         | ``amdrocm-rand-gfx120x``
         | ``amdrocm-rand-gfx908``
         | ``amdrocm-rand-gfx90a``
         | ``amdrocm-rand-gfx94x``
         | ``amdrocm-rand-gfx950``
         | ``amdrocm-rand7.12-gfx110x``
         | ``amdrocm-rand7.12-gfx1150``
         | ``amdrocm-rand7.12-gfx1151``
         | ``amdrocm-rand7.12-gfx1152``
         | ``amdrocm-rand7.12-gfx120x``
         | ``amdrocm-rand7.12-gfx908``
         | ``amdrocm-rand7.12-gfx90a``
         | ``amdrocm-rand7.12-gfx94x``
         | ``amdrocm-rand7.12-gfx950``

   .. matrix-row::

      .. matrix-cell:: hipRAND

      .. matrix-cell:: Yes (Instinct, Radeon, Ryzen)

      .. matrix-cell:: Yes (Radeon, Ryzen)

      .. matrix-cell::

         | ``amdrocm-rand-dev-gfx110x``
         | ``amdrocm-rand-dev-gfx1150``
         | ``amdrocm-rand-dev-gfx1151``
         | ``amdrocm-rand-dev-gfx1152``
         | ``amdrocm-rand-dev-gfx120x``
         | ``amdrocm-rand-dev-gfx908``
         | ``amdrocm-rand-dev-gfx90a``
         | ``amdrocm-rand-dev-gfx94x``
         | ``amdrocm-rand-dev-gfx950``
         | ``amdrocm-rand-dev7.12-gfx110x``
         | ``amdrocm-rand-dev7.12-gfx1150``
         | ``amdrocm-rand-dev7.12-gfx1151``
         | ``amdrocm-rand-dev7.12-gfx1152``
         | ``amdrocm-rand-dev7.12-gfx120x``
         | ``amdrocm-rand-dev7.12-gfx908``
         | ``amdrocm-rand-dev7.12-gfx90a``
         | ``amdrocm-rand-dev7.12-gfx94x``
         | ``amdrocm-rand-dev7.12-gfx950``
         | ``amdrocm-rand-gfx110x``
         | ``amdrocm-rand-gfx1150``
         | ``amdrocm-rand-gfx1151``
         | ``amdrocm-rand-gfx1152``
         | ``amdrocm-rand-gfx120x``
         | ``amdrocm-rand-gfx908``
         | ``amdrocm-rand-gfx90a``
         | ``amdrocm-rand-gfx94x``
         | ``amdrocm-rand-gfx950``
         | ``amdrocm-rand7.12-gfx110x``
         | ``amdrocm-rand7.12-gfx1150``
         | ``amdrocm-rand7.12-gfx1151``
         | ``amdrocm-rand7.12-gfx1152``
         | ``amdrocm-rand7.12-gfx120x``
         | ``amdrocm-rand7.12-gfx908``
         | ``amdrocm-rand7.12-gfx90a``
         | ``amdrocm-rand7.12-gfx94x``
         | ``amdrocm-rand7.12-gfx950``

   .. matrix-row::

      .. matrix-cell:: rocSOLVER

      .. matrix-cell:: Yes (Instinct, Radeon, Ryzen)

      .. matrix-cell:: Yes (Radeon, Ryzen)

      .. matrix-cell::

         | ``amdrocm-solver-dev-gfx110x``
         | ``amdrocm-solver-dev-gfx1150``
         | ``amdrocm-solver-dev-gfx1151``
         | ``amdrocm-solver-dev-gfx1152``
         | ``amdrocm-solver-dev-gfx120x``
         | ``amdrocm-solver-dev-gfx908``
         | ``amdrocm-solver-dev-gfx90a``
         | ``amdrocm-solver-dev-gfx94x``
         | ``amdrocm-solver-dev-gfx950``
         | ``amdrocm-solver-dev7.12-gfx110x``
         | ``amdrocm-solver-dev7.12-gfx1150``
         | ``amdrocm-solver-dev7.12-gfx1151``
         | ``amdrocm-solver-dev7.12-gfx1152``
         | ``amdrocm-solver-dev7.12-gfx120x``
         | ``amdrocm-solver-dev7.12-gfx908``
         | ``amdrocm-solver-dev7.12-gfx90a``
         | ``amdrocm-solver-dev7.12-gfx94x``
         | ``amdrocm-solver-dev7.12-gfx950``
         | ``amdrocm-solver-gfx110x``
         | ``amdrocm-solver-gfx1150``
         | ``amdrocm-solver-gfx1151``
         | ``amdrocm-solver-gfx1152``
         | ``amdrocm-solver-gfx120x``
         | ``amdrocm-solver-gfx908``
         | ``amdrocm-solver-gfx90a``
         | ``amdrocm-solver-gfx94x``
         | ``amdrocm-solver-gfx950``
         | ``amdrocm-solver7.12-gfx110x``
         | ``amdrocm-solver7.12-gfx1150``
         | ``amdrocm-solver7.12-gfx1151``
         | ``amdrocm-solver7.12-gfx1152``
         | ``amdrocm-solver7.12-gfx120x``
         | ``amdrocm-solver7.12-gfx908``
         | ``amdrocm-solver7.12-gfx90a``
         | ``amdrocm-solver7.12-gfx94x``
         | ``amdrocm-solver7.12-gfx950``

   .. matrix-row::

      .. matrix-cell:: hipSOLVER

      .. matrix-cell:: Yes (Instinct, Radeon, Ryzen)

      .. matrix-cell:: Yes (Radeon, Ryzen)

      .. matrix-cell::

         | ``amdrocm-solver-dev-gfx110x``
         | ``amdrocm-solver-dev-gfx1150``
         | ``amdrocm-solver-dev-gfx1151``
         | ``amdrocm-solver-dev-gfx1152``
         | ``amdrocm-solver-dev-gfx120x``
         | ``amdrocm-solver-dev-gfx908``
         | ``amdrocm-solver-dev-gfx90a``
         | ``amdrocm-solver-dev-gfx94x``
         | ``amdrocm-solver-dev-gfx950``
         | ``amdrocm-solver-dev7.12-gfx110x``
         | ``amdrocm-solver-dev7.12-gfx1150``
         | ``amdrocm-solver-dev7.12-gfx1151``
         | ``amdrocm-solver-dev7.12-gfx1152``
         | ``amdrocm-solver-dev7.12-gfx120x``
         | ``amdrocm-solver-dev7.12-gfx908``
         | ``amdrocm-solver-dev7.12-gfx90a``
         | ``amdrocm-solver-dev7.12-gfx94x``
         | ``amdrocm-solver-dev7.12-gfx950``
         | ``amdrocm-solver-gfx110x``
         | ``amdrocm-solver-gfx1150``
         | ``amdrocm-solver-gfx1151``
         | ``amdrocm-solver-gfx1152``
         | ``amdrocm-solver-gfx120x``
         | ``amdrocm-solver-gfx908``
         | ``amdrocm-solver-gfx90a``
         | ``amdrocm-solver-gfx94x``
         | ``amdrocm-solver-gfx950``
         | ``amdrocm-solver7.12-gfx110x``
         | ``amdrocm-solver7.12-gfx1150``
         | ``amdrocm-solver7.12-gfx1151``
         | ``amdrocm-solver7.12-gfx1152``
         | ``amdrocm-solver7.12-gfx120x``
         | ``amdrocm-solver7.12-gfx908``
         | ``amdrocm-solver7.12-gfx90a``
         | ``amdrocm-solver7.12-gfx94x``
         | ``amdrocm-solver7.12-gfx950``

   .. matrix-row::

      .. matrix-cell:: rocSPARSE

      .. matrix-cell:: Yes (Instinct, Radeon, Ryzen)

      .. matrix-cell:: Yes (Radeon, Ryzen)

      .. matrix-cell::

         | ``amdrocm-sparse-dev-gfx110x``
         | ``amdrocm-sparse-dev-gfx1150``
         | ``amdrocm-sparse-dev-gfx1151``
         | ``amdrocm-sparse-dev-gfx1152``
         | ``amdrocm-sparse-dev-gfx120x``
         | ``amdrocm-sparse-dev-gfx908``
         | ``amdrocm-sparse-dev-gfx90a``
         | ``amdrocm-sparse-dev-gfx94x``
         | ``amdrocm-sparse-dev-gfx950``
         | ``amdrocm-sparse-dev7.12-gfx110x``
         | ``amdrocm-sparse-dev7.12-gfx1150``
         | ``amdrocm-sparse-dev7.12-gfx1151``
         | ``amdrocm-sparse-dev7.12-gfx1152``
         | ``amdrocm-sparse-dev7.12-gfx120x``
         | ``amdrocm-sparse-dev7.12-gfx908``
         | ``amdrocm-sparse-dev7.12-gfx90a``
         | ``amdrocm-sparse-dev7.12-gfx94x``
         | ``amdrocm-sparse-dev7.12-gfx950``
         | ``amdrocm-sparse-gfx110x``
         | ``amdrocm-sparse-gfx1150``
         | ``amdrocm-sparse-gfx1151``
         | ``amdrocm-sparse-gfx1152``
         | ``amdrocm-sparse-gfx120x``
         | ``amdrocm-sparse-gfx908``
         | ``amdrocm-sparse-gfx90a``
         | ``amdrocm-sparse-gfx94x``
         | ``amdrocm-sparse-gfx950``
         | ``amdrocm-sparse7.12-gfx110x``
         | ``amdrocm-sparse7.12-gfx1150``
         | ``amdrocm-sparse7.12-gfx1151``
         | ``amdrocm-sparse7.12-gfx1152``
         | ``amdrocm-sparse7.12-gfx120x``
         | ``amdrocm-sparse7.12-gfx908``
         | ``amdrocm-sparse7.12-gfx90a``
         | ``amdrocm-sparse7.12-gfx94x``
         | ``amdrocm-sparse7.12-gfx950``

   .. matrix-row::

      .. matrix-cell:: hipSPARSE

      .. matrix-cell:: Yes (Instinct, Radeon, Ryzen)

      .. matrix-cell:: Yes (Radeon, Ryzen)

      .. matrix-cell::

         | ``amdrocm-sparse-dev-gfx110x``
         | ``amdrocm-sparse-dev-gfx1150``
         | ``amdrocm-sparse-dev-gfx1151``
         | ``amdrocm-sparse-dev-gfx1152``
         | ``amdrocm-sparse-dev-gfx120x``
         | ``amdrocm-sparse-dev-gfx908``
         | ``amdrocm-sparse-dev-gfx90a``
         | ``amdrocm-sparse-dev-gfx94x``
         | ``amdrocm-sparse-dev-gfx950``
         | ``amdrocm-sparse-dev7.12-gfx110x``
         | ``amdrocm-sparse-dev7.12-gfx1150``
         | ``amdrocm-sparse-dev7.12-gfx1151``
         | ``amdrocm-sparse-dev7.12-gfx1152``
         | ``amdrocm-sparse-dev7.12-gfx120x``
         | ``amdrocm-sparse-dev7.12-gfx908``
         | ``amdrocm-sparse-dev7.12-gfx90a``
         | ``amdrocm-sparse-dev7.12-gfx94x``
         | ``amdrocm-sparse-dev7.12-gfx950``
         | ``amdrocm-sparse-gfx110x``
         | ``amdrocm-sparse-gfx1150``
         | ``amdrocm-sparse-gfx1151``
         | ``amdrocm-sparse-gfx1152``
         | ``amdrocm-sparse-gfx120x``
         | ``amdrocm-sparse-gfx908``
         | ``amdrocm-sparse-gfx90a``
         | ``amdrocm-sparse-gfx94x``
         | ``amdrocm-sparse-gfx950``
         | ``amdrocm-sparse7.12-gfx110x``
         | ``amdrocm-sparse7.12-gfx1150``
         | ``amdrocm-sparse7.12-gfx1151``
         | ``amdrocm-sparse7.12-gfx1152``
         | ``amdrocm-sparse7.12-gfx120x``
         | ``amdrocm-sparse7.12-gfx908``
         | ``amdrocm-sparse7.12-gfx90a``
         | ``amdrocm-sparse7.12-gfx94x``
         | ``amdrocm-sparse7.12-gfx950``

   .. matrix-row::

      .. matrix-cell:: hipSPARSELt

      .. matrix-cell:: Yes (Instinct gfx942 and gfx950 only; Ryzen MI350 APU only)

      .. matrix-cell:: No

      .. matrix-cell::

         | ``amdrocm-blas-dev-gfx110x``
         | ``amdrocm-blas-dev-gfx1150``
         | ``amdrocm-blas-dev-gfx1151``
         | ``amdrocm-blas-dev-gfx1152``
         | ``amdrocm-blas-dev-gfx120x``
         | ``amdrocm-blas-dev-gfx908``
         | ``amdrocm-blas-dev-gfx90a``
         | ``amdrocm-blas-dev-gfx94x``
         | ``amdrocm-blas-dev-gfx950``
         | ``amdrocm-blas-dev7.12-gfx110x``
         | ``amdrocm-blas-dev7.12-gfx1150``
         | ``amdrocm-blas-dev7.12-gfx1151``
         | ``amdrocm-blas-dev7.12-gfx1152``
         | ``amdrocm-blas-dev7.12-gfx120x``
         | ``amdrocm-blas-dev7.12-gfx908``
         | ``amdrocm-blas-dev7.12-gfx90a``
         | ``amdrocm-blas-dev7.12-gfx94x``
         | ``amdrocm-blas-dev7.12-gfx950``
         | ``amdrocm-blas-gfx110x``
         | ``amdrocm-blas-gfx1150``
         | ``amdrocm-blas-gfx1151``
         | ``amdrocm-blas-gfx1152``
         | ``amdrocm-blas-gfx120x``
         | ``amdrocm-blas-gfx908``
         | ``amdrocm-blas-gfx90a``
         | ``amdrocm-blas-gfx94x``
         | ``amdrocm-blas-gfx950``
         | ``amdrocm-blas7.12-gfx110x``
         | ``amdrocm-blas7.12-gfx1150``
         | ``amdrocm-blas7.12-gfx1151``
         | ``amdrocm-blas7.12-gfx1152``
         | ``amdrocm-blas7.12-gfx120x``
         | ``amdrocm-blas7.12-gfx908``
         | ``amdrocm-blas7.12-gfx90a``
         | ``amdrocm-blas7.12-gfx94x``
         | ``amdrocm-blas7.12-gfx950``

   .. matrix-row::

      .. matrix-cell:: Composable Kernel

      .. matrix-cell::

         Yes (RDNA 3+)

         Instinct: gfx908, gfx90a, gfx942, gfx950

         Radeon: gfx10.3, gfx11, gfx12

      .. matrix-cell::

         Yes (RDNA 3+)

         Radeon: gfx10.3, gfx11, gfx12

      .. matrix-cell::

         | ``amdrocm-ck-gfx1150``
         | ``amdrocm-ck-gfx1151``
         | ``amdrocm-ck-gfx1152``
         | ``amdrocm-ck-gfx120x``
         | ``amdrocm-ck-gfx908``
         | ``amdrocm-ck-gfx90a``
         | ``amdrocm-ck-gfx94x``
         | ``amdrocm-ck-gfx950``
         | ``amdrocm-ck7.12-gfx1150``
         | ``amdrocm-ck7.12-gfx1151``
         | ``amdrocm-ck7.12-gfx1152``
         | ``amdrocm-ck7.12-gfx120x``
         | ``amdrocm-ck7.12-gfx908``
         | ``amdrocm-ck7.12-gfx90a``
         | ``amdrocm-ck7.12-gfx94x``
         | ``amdrocm-ck7.12-gfx950``

   .. matrix-row::

      .. matrix-cell:: rocWMMA

      .. matrix-cell:: Yes (Instinct, Radeon, Ryzen; RDNA 3+)

      .. matrix-cell:: Yes (Radeon, Ryzen; RDNA 3+)

      .. matrix-cell::

         | ``amdrocm-math-common7.12``
         | ``amdrocm-math-common``

   .. matrix-row::

      .. matrix-cell:: rocPRIM

      .. matrix-cell:: Yes (Instinct, Radeon, Ryzen)

      .. matrix-cell:: Yes (Radeon, Ryzen)

      .. matrix-cell::

         | ``amdrocm-ccl-dev-gfx110x``
         | ``amdrocm-ccl-dev-gfx1150``
         | ``amdrocm-ccl-dev-gfx1151``
         | ``amdrocm-ccl-dev-gfx1152``
         | ``amdrocm-ccl-dev-gfx120x``
         | ``amdrocm-ccl-dev-gfx908``
         | ``amdrocm-ccl-dev-gfx90a``
         | ``amdrocm-ccl-dev-gfx94x``
         | ``amdrocm-ccl-dev-gfx950``
         | ``amdrocm-ccl-dev7.12-gfx110x``
         | ``amdrocm-ccl-dev7.12-gfx1150``
         | ``amdrocm-ccl-dev7.12-gfx1151``
         | ``amdrocm-ccl-dev7.12-gfx1152``
         | ``amdrocm-ccl-dev7.12-gfx120x``
         | ``amdrocm-ccl-dev7.12-gfx908``
         | ``amdrocm-ccl-dev7.12-gfx90a``
         | ``amdrocm-ccl-dev7.12-gfx94x``
         | ``amdrocm-ccl-dev7.12-gfx950``

   .. matrix-row::

      .. matrix-cell:: rocThrust

      .. matrix-cell:: Yes (Instinct, Radeon, Ryzen)

      .. matrix-cell:: Yes (Radeon, Ryzen)

      .. matrix-cell::

         | ``amdrocm-ccl-dev-gfx110x``
         | ``amdrocm-ccl-dev-gfx1150``
         | ``amdrocm-ccl-dev-gfx1151``
         | ``amdrocm-ccl-dev-gfx1152``
         | ``amdrocm-ccl-dev-gfx120x``
         | ``amdrocm-ccl-dev-gfx908``
         | ``amdrocm-ccl-dev-gfx90a``
         | ``amdrocm-ccl-dev-gfx94x``
         | ``amdrocm-ccl-dev-gfx950``
         | ``amdrocm-ccl-dev7.12-gfx110x``
         | ``amdrocm-ccl-dev7.12-gfx1150``
         | ``amdrocm-ccl-dev7.12-gfx1151``
         | ``amdrocm-ccl-dev7.12-gfx1152``
         | ``amdrocm-ccl-dev7.12-gfx120x``
         | ``amdrocm-ccl-dev7.12-gfx908``
         | ``amdrocm-ccl-dev7.12-gfx90a``
         | ``amdrocm-ccl-dev7.12-gfx94x``
         | ``amdrocm-ccl-dev7.12-gfx950``

   .. matrix-row::

      .. matrix-cell:: hipCUB

      .. matrix-cell:: Yes (Instinct, Radeon, Ryzen)

      .. matrix-cell:: Yes (Radeon, Ryzen)

      .. matrix-cell::

         | ``amdrocm-ccl-dev-gfx110x``
         | ``amdrocm-ccl-dev-gfx1150``
         | ``amdrocm-ccl-dev-gfx1151``
         | ``amdrocm-ccl-dev-gfx1152``
         | ``amdrocm-ccl-dev-gfx120x``
         | ``amdrocm-ccl-dev-gfx908``
         | ``amdrocm-ccl-dev-gfx90a``
         | ``amdrocm-ccl-dev-gfx94x``
         | ``amdrocm-ccl-dev-gfx950``
         | ``amdrocm-ccl-dev7.12-gfx110x``
         | ``amdrocm-ccl-dev7.12-gfx1150``
         | ``amdrocm-ccl-dev7.12-gfx1151``
         | ``amdrocm-ccl-dev7.12-gfx1152``
         | ``amdrocm-ccl-dev7.12-gfx120x``
         | ``amdrocm-ccl-dev7.12-gfx908``
         | ``amdrocm-ccl-dev7.12-gfx90a``
         | ``amdrocm-ccl-dev7.12-gfx94x``
         | ``amdrocm-ccl-dev7.12-gfx950``

   .. matrix-row::

      .. matrix-cell:: Communication Libraries
         :rowspan: 2

      .. matrix-cell:: RCCL

      .. matrix-cell:: Yes (Instinct, Radeon, Ryzen)

      .. matrix-cell:: No

      .. matrix-cell::

         | ``amdrocm-rccl-dev-gfx110x``
         | ``amdrocm-rccl-dev-gfx1150``
         | ``amdrocm-rccl-dev-gfx1151``
         | ``amdrocm-rccl-dev-gfx1152``
         | ``amdrocm-rccl-dev-gfx120x``
         | ``amdrocm-rccl-dev-gfx908``
         | ``amdrocm-rccl-dev-gfx90a``
         | ``amdrocm-rccl-dev-gfx94x``
         | ``amdrocm-rccl-dev-gfx950``
         | ``amdrocm-rccl-dev7.12-gfx110x``
         | ``amdrocm-rccl-dev7.12-gfx1150``
         | ``amdrocm-rccl-dev7.12-gfx1151``
         | ``amdrocm-rccl-dev7.12-gfx1152``
         | ``amdrocm-rccl-dev7.12-gfx120x``
         | ``amdrocm-rccl-dev7.12-gfx908``
         | ``amdrocm-rccl-dev7.12-gfx90a``
         | ``amdrocm-rccl-dev7.12-gfx94x``
         | ``amdrocm-rccl-dev7.12-gfx950``
         | ``amdrocm-rccl-gfx110x``
         | ``amdrocm-rccl-gfx1150``
         | ``amdrocm-rccl-gfx1151``
         | ``amdrocm-rccl-gfx1152``
         | ``amdrocm-rccl-gfx120x``
         | ``amdrocm-rccl-gfx908``
         | ``amdrocm-rccl-gfx90a``
         | ``amdrocm-rccl-gfx94x``
         | ``amdrocm-rccl-gfx950``
         | ``amdrocm-rccl7.12-gfx110x``
         | ``amdrocm-rccl7.12-gfx1150``
         | ``amdrocm-rccl7.12-gfx1151``
         | ``amdrocm-rccl7.12-gfx1152``
         | ``amdrocm-rccl7.12-gfx120x``
         | ``amdrocm-rccl7.12-gfx908``
         | ``amdrocm-rccl7.12-gfx90a``
         | ``amdrocm-rccl7.12-gfx94x``
         | ``amdrocm-rccl7.12-gfx950``

   .. matrix-row::

      .. matrix-cell:: rocSHMEM

      .. matrix-cell:: Yes (gfx90a, gfx1100, gfx1201, gfx942, gfx950)

      .. matrix-cell:: No

      .. matrix-cell:: Package not available for 7.12.0; available in 7.13.0.

   .. matrix-row::

      .. matrix-cell:: AI & ML Ecosystem

      .. matrix-cell:: MIOpen

      .. matrix-cell::

         Yes (Instinct, Radeon, Ryzen; RDNA 3+)

         Note: Heuristics not yet available on Radeon.

      .. matrix-cell:: Yes (Radeon, Ryzen; RDNA 3+)

      .. matrix-cell::

         | ``amdrocm-dnn-dev-gfx110x``
         | ``amdrocm-dnn-dev-gfx1150``
         | ``amdrocm-dnn-dev-gfx1151``
         | ``amdrocm-dnn-dev-gfx1152``
         | ``amdrocm-dnn-dev-gfx120x``
         | ``amdrocm-dnn-dev-gfx908``
         | ``amdrocm-dnn-dev-gfx90a``
         | ``amdrocm-dnn-dev-gfx94x``
         | ``amdrocm-dnn-dev-gfx950``
         | ``amdrocm-dnn-dev7.12-gfx110x``
         | ``amdrocm-dnn-dev7.12-gfx1150``
         | ``amdrocm-dnn-dev7.12-gfx1151``
         | ``amdrocm-dnn-dev7.12-gfx1152``
         | ``amdrocm-dnn-dev7.12-gfx120x``
         | ``amdrocm-dnn-dev7.12-gfx908``
         | ``amdrocm-dnn-dev7.12-gfx90a``
         | ``amdrocm-dnn-dev7.12-gfx94x``
         | ``amdrocm-dnn-dev7.12-gfx950``
         | ``amdrocm-dnn-gfx110x``
         | ``amdrocm-dnn-gfx1150``
         | ``amdrocm-dnn-gfx1151``
         | ``amdrocm-dnn-gfx1152``
         | ``amdrocm-dnn-gfx120x``
         | ``amdrocm-dnn-gfx908``
         | ``amdrocm-dnn-gfx90a``
         | ``amdrocm-dnn-gfx94x``
         | ``amdrocm-dnn-gfx950``
         | ``amdrocm-dnn7.12-gfx110x``
         | ``amdrocm-dnn7.12-gfx1150``
         | ``amdrocm-dnn7.12-gfx1151``
         | ``amdrocm-dnn7.12-gfx1152``
         | ``amdrocm-dnn7.12-gfx120x``
         | ``amdrocm-dnn7.12-gfx908``
         | ``amdrocm-dnn7.12-gfx90a``
         | ``amdrocm-dnn7.12-gfx94x``
         | ``amdrocm-dnn7.12-gfx950``

   .. matrix-row::

      .. matrix-cell:: Linux Tools
         :rowspan: 4

      .. matrix-cell:: AMDSMI BM/Guest

      .. matrix-cell:: Yes (Instinct and Radeon)

      .. matrix-cell:: No

      .. matrix-cell::

   .. matrix-row::

      .. matrix-cell:: AMDSMI SRIOV Guest

      .. matrix-cell:: Yes (Instinct and Radeon)

      .. matrix-cell:: Yes (NV21/NV32 DC boards)

      .. matrix-cell::

   .. matrix-row::

      .. matrix-cell:: RDC

      .. matrix-cell:: Yes (Instinct and Radeon)

      .. matrix-cell:: No

      .. matrix-cell::

         | ``amdrocm-rdc7.12``
         | ``amdrocm-rdc``

   .. matrix-row::

      .. matrix-cell:: RBT/TransferBench

      .. matrix-cell:: Yes (Instinct, Radeon, Ryzen)

      .. matrix-cell:: No

      .. matrix-cell:: Part of Expansion SDK
