:orphan:

.. meta::
   :description: Multi-node setup for AI training and inference
   :keywords: gpu, accelerator, system, health, validation, bench, perf, performance, rvs, rccl, babel, mi300x, mi325x, flops, bandwidth, rbt, training, inference

.. _rocm-for-ai-multi-node-setup:

**********************************************
Multi-node setup for AI training and inference
**********************************************

AMD provides ready-to-use Docker images for AMD Instinct™ MI300X and MI325X accelerators containing
ROCm-capable deep learning frameworks and essential software components. These Dockers can
run and take advantage of multiple nodes if they are available. This document describes how to
enable the multi-node training and inference of AI workloads on AMD data center class accelerators.

For setting multi-node network
configuration, please follow [1]. The steps below need to be followed once you are inside our docker
container and assume that multi node setup is already in place. 

Install required packages
=========================

To run multi-node workloads, make sure you have all the required packages installed based on your
network device.

.. code-block::

   apt install iproute2 -y

   apt install -y linux-headers-"$(uname -r)" libelf-dev

   apt install -y gcc make libtool autoconf librdmacm-dev rdmacm-utils infiniband-diags ibverbs-utils perftest ethtool libibverbs-dev rdma-core strace libibmad5 libibnetdisc5 ibverbs-providers libibumad-dev libibumad3 libibverbs1 libnl-3-dev libnl-route-3-dev

Compile and install the RoCE library
====================================

If you're using Broadcom NICs, you need to compile and install the RoCE (RDMA over Converged
Ethernet) library. Note that it is important to install the same version of library which is
installed on the host and make sure the path to the libraries is mounted in the Docker. See the
`Ethernet networking guide for AMD Instinct MI300X GPU clusters: Compiling Broadcom NIC software
from source <https://docs.broadcom.com/doc/957608-AN2XX#page=81>`_ for more details.

Further reading
===============

* `Multi-node network configuration for AMD Instinct accelerators <https://instinct.docs.amd.com/projects/gpu-cluster-networking/en/latest/how-to/multi-node-config.html>`_

* `AMD Instinct MI300 Series Cluster Reference Architecture Guide <https://www.amd.com/content/dam/amd/en/documents/instinct-tech-docs/other/instinct-mi300-series-cluster-reference-guide.pdf>`_
