*****************
JAX release notes
*****************

The following sections summarize enabled features, enhanced capabilities, and any known
issues for ROCm-enabled JAX releases.

JAX 0.6.0 with ROCm 7.0
=======================

- Upgraded XLA backend: Integrates a newer XLA version, enabling better
  optimizations, broader operator support, and potential performance gains.

- RNN support: Native RNN support (including LSTMs via ``jax.experimental.rnn``)
  now available on ROCm, aiding sequence model development.

- Comprehensive linear algebra capabilities: Offers robust ``jax.linalg``
  operations, essential for scientific and machine learning tasks.

- Expanded AMD GPU architecture support: Provides ongoing support for gfx1101
  GPUs and introduces support for gfx950 and gfx12xx GPUs.

- Mixed FP8 precision support: Enables ``lax.dot_general`` operations with mixed FP8
  types, offering pathways for memory and compute efficiency.

- Streamlined PyPi packaging: Provides reliable PyPi wheels for JAX on ROCm,
  simplifying the installation process.

- Pallas experimental kernel development: Continued Pallas framework
  enhancements for custom GPU kernels, including new intrinsics (specific
  kernel behaviors under review).

- Improved build system and CI: Enhanced ROCm build system and CI for greater
  reliability and maintainability.

- Enhanced distributed computing setup: Improved JAX setup in multi-GPU
  distributed environments.

.. _jax_comp_known_issues:

Known issues
------------

- ``nn.dot_product_attention``: Certain configurations of ``jax.nn.dot_product_attention``
  may cause segmentation faults, though the majority of use cases work correctly.

- SVD with dynamic shapes: SVD on inputs with dynamic/symbolic shapes might result in an error.
  SVD with static shapes is unaffected.

- QR decomposition with symbolic shapes: QR decomposition operations may fail when using
  symbolic/dynamic shapes in shape polymorphic contexts.

- Pallas kernels: Specific advanced Pallas kernels may exhibit variations in
  numerical output or resource usage. These are actively reviewed as part of
  Pallas's experimental development.
