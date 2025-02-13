.. meta::
   :description: Learn how to validate LLM inference performance on MI300X accelerators using AMD MAD and the
                 ROCm vLLM Docker image.
   :keywords: model, MAD, automation, dashboarding, validate

***********************************************************
LLM inference performance validation on AMD Instinct MI300X
***********************************************************

.. _vllm-benchmark-unified-docker:

.. datatemplate:yaml:: ./vllm-benchmark-models2.yaml

   {% set unified_docker = data.vllm_benchmark.unified_docker.latest %}
   {% set model_groups = data.vllm_benchmark.model_groups %}

   The `ROCm vLLM Docker <{{ unified_docker.docker_hub_url }}>`_ image offers
   a prebuilt, optimized environment for validating large language model (LLM)
   inference performance on the AMD Instinct™ MI300X accelerator. This ROCm vLLM
   Docker image integrates vLLM and PyTorch tailored specifically for the MI300X
   accelerator and includes the following components:

   * `ROCm {{ unified_docker.rocm_version }} <https://github.com/ROCm/ROCm>`_

   * `vLLM {{ unified_docker.vllm_version }} <https://docs.vllm.ai/en/latest>`_

   * `PyTorch {{ unified_docker.pytorch_version }} <https://github.com/pytorch/pytorch>`_

   With this Docker image, you can quickly validate the expected inference
   performance numbers for the MI300X accelerator. This topic also provides tips on
   optimizing performance with popular AI models. 

   Available models
   ================

   .. raw:: html

      <div id="vllm-benchmark-ud-params-picker" class="container-fluid">
        <div class="row">
          <div class="col-2 me-1 model-param-head">Model</div>
          <div class="row col-10">
   {% for model_group in model_groups %}
            <div class="col-3 model-param" data-param-k="model-group" data-param-v="{{ model_group.tag }}">{{ model_group.group }}</div>
   {% endfor %}
          </div>
        </div>

        <div class="row mt-1">
          <div class="col-2 me-1 model-param-head">Model variant</div>
          <div class="row col-10">
   {% for model_group in model_groups %}
   {% for model in model_group.models %}
            <div class="col-4 model-param" data-param-k="model" data-param-v="{{ model.mad_tag }}" data-param-group="{{ model_group.tag }}">{{ model.model }}</div>
   {% endfor %}
   {% endfor %}
          </div>
        </div>
      </div>

   .. _vllm-benchmark-vllm:

   .. note::

      vLLM is a toolkit and library for LLM inference and serving. AMD implements
      high-performance custom kernels and modules in vLLM to enhance performance.
      See :ref:`fine-tuning-llms-vllm` and :ref:`mi300x-vllm-optimization` for
      more information.

   Getting started
   ===============

   Use the following procedures to reproduce the benchmark results on an
   MI300X accelerator with the prebuilt vLLM Docker image.

   .. _vllm-benchmark-get-started:

   1. Disable NUMA auto-balancing.

      To optimize performance, disable automatic NUMA balancing. Otherwise, the GPU
      might hang until the periodic balancing is finalized. For more information,
      see :ref:`AMD Instinct MI300X system optimization <mi300x-disable-numa>`.

      .. code-block:: shell

         # disable automatic NUMA balancing
         sh -c 'echo 0 > /proc/sys/kernel/numa_balancing'
         # check if NUMA balancing is disabled (returns 0 if disabled)
         cat /proc/sys/kernel/numa_balancing
         0

   2. Download the :ref:`ROCm vLLM Docker image <vllm-benchmark-unified-docker>`.

      Use the following command to pull the Docker image from Docker Hub.

      .. code-block:: shell

         docker pull {{ unified_docker.pull_tag }}

   Once the setup is complete, choose between two options to reproduce the
   benchmark results:

   -  :ref:`MAD-integrated benchmarking <vllm-benchmark-mad>`

   -  :ref:`Standalone benchmarking <vllm-benchmark-standalone>`

   .. _vllm-benchmark-mad:

   {% for model_group in model_groups %}
   {% for model in model_group.models %}
   .. raw:: html

                <section id="mad-integrated-benchmarking-{{model.mad_tag}}" data-param-k="model" data-param-v="{{model.mad_tag}}">
                  <h2>MAD-integrated benchmarking<a class="headerlink" href="#mad-integrated-benchmarking-{{model.mad_tag}}"
                      title="Link to this heading">#</a></h2>
                  <p>Clone the ROCm Model Automation and Dashboarding (<a class="github reference external"
                      href="https://github.com/ROCm/MAD">ROCm/MAD</a>) repository to a local
                    directory and install the required packages on the host machine.</p>
                  <div class="highlight-shell notranslate">
                    <div class="highlight">
                      <pre><span></span>git<span class="w"> </span>clone<span class="w">
                        </span>https://github.com/ROCm/MAD
                        <span class="nb">cd</span><span class="w"> </span>MAD
                        pip<span class="w"> </span>install<span class="w"> </span>-r<span class="w">
                        </span>requirements.txt
                      </pre>
                    </div>
                  </div>
                  <p>Use this command to run a performance benchmark test of the {{model.model}} model
                    on one GPU with <code class="docutils literal notranslate"><span class="pre">float16</span></code>
                    data type in the host machine.</p>
                  <div class="highlight-shell notranslate">
                    <div class="highlight">
                      <pre><span></span><span class="nb">export</span><span class="w"> </span><span
                          class="nv">MAD_SECRETS_HFTOKEN</span><span class="o">=</span><span class="s2">"your personal
                          Hugging Face token to access gated models"</span>
                        python3<span class="w"> </span>tools/run_models.py<span class="w"> </span>--tags<span class="w">
                        </span>{{model.mad_tag}}<span class="w"> </span>--keep-model-dir<span class="w">
                        </span>--live-output<span class="w"> </span>--timeout<span class="w"> </span><span
                          class="m">28800</span>
                      </pre>
                    </div>
                  </div>
                  <p>ROCm MAD launches a Docker container with the name
                    <code class="docutils literal notranslate"><span
                        class="pre">container_ci-{{model.mad_tag}}</span></code>. The latency and throughput reports
                    of the
                    model are collected in the following path: <code class="docutils literal notranslate"><span
                        class="pre">~/MAD/reports_float16/</span></code>.
                  </p>
                  <p>Although the following models are preconfigured to collect latency and
                    throughput performance data, you can also change the benchmarking parameters.
                    Refer to the <a class="reference internal" href="#vllm-benchmark-standalone"><span
                        class="std std-ref">Standalone benchmarking</span></a> section.</p>
                </section>
                <section id="standalone-benchmarking-{{model.mad_tag}}" data-param-k="model" data-param-v="{{model.mad_tag}}">
                  <span id="vllm-benchmark-standalone"></span>
                  <h2>Standalone benchmarking<a class="headerlink" href="#standalone-benchmarking-{{model.mad_tag}}"
                      title="Link to this heading">#</a></h2>
                  <p>You can run the vLLM benchmark tool independently by starting the
                    <a class="reference internal" href="#vllm-benchmark-get-started"><span class="std std-ref">Docker
                        container</span></a> as shown in the following
                    snippet.
                  </p>
                  <div class="highlight-default notranslate">
                    <div class="highlight">
                      <pre><span></span>docker pull rocm/vllm:rocm6.3.1_mi300_ubuntu22.04_py3.12_vllm_0.6.6
                        docker run -it --device=/dev/kfd --device=/dev/dri --group-add video --shm-size 16G
                        --security-opt seccomp=unconfined --security-opt apparmor=unconfined --cap-add=SYS_PTRACE -v
                        $(pwd):/workspace --env HUGGINGFACE_HUB_CACHE=/workspace --name vllm_v0.6.6
                        rocm/vllm:rocm6.3.1_mi300_ubuntu22.04_py3.12_vllm_0.6.6
                      </pre>
                    </div>
                  </div>
                  <p>In the Docker container, clone the ROCm MAD repository and navigate to the
                    benchmark scripts directory at <code class="docutils literal notranslate"><span
                        class="pre">~/MAD/scripts/vllm</span></code>.</p>
                  <div class="highlight-default notranslate">
                    <div class="highlight">
                      <pre><span></span><span class="n">git</span> <span class="n">clone</span> <span
                          class="n">https</span><span class="p">:</span><span class="o">//</span><span
                          class="n">github</span><span class="o">.</span><span class="n">com</span><span
                          class="o">/</span><span class="n">ROCm</span><span class="o">/</span><span
                          class="n">MAD</span>
                        <span class="n">cd</span> <span class="n">MAD</span><span class="o">/</span><span
                          class="n">scripts</span><span class="o">/</span><span class="n">vllm</span>
                      </pre>
                    </div>
                  </div>
                  <section id="command">
                    <h3>Command<a class="headerlink" href="#command" title="Link to this heading">#</a></h3>
                    <p>To start the benchmark, use the following command with the appropriate options.
                      See <a class="reference internal" href="#vllm-benchmark-standalone-options"><span
                          class="std std-ref">Options</span></a> for the list of
                      options and their descriptions.</p>
                    <div class="highlight-shell notranslate">
                      <div class="highlight">
                          <pre>
                           <span>./vllm_benchmark_report.sh -s $test_option -m {{model.model_repo}} -g $num_gpu -d {{model.precision}}</span>
                          </pre>
                      </div>
                    </div>
                    <p>See the <a class="reference internal" href="#vllm-benchmark-run-benchmark"><span
                          class="std std-ref">examples</span></a> for more information.</p>
                    <div class="admonition note">
                      <p class="admonition-title">Note</p>
                      <p>The input sequence length, output sequence length, and tensor parallel (TP) are
                        already configured. You don’t need to specify them with this script.</p>
                    </div>
                    <div class="admonition note">
                      <p class="admonition-title">Note</p>
                      <p>If you encounter the following error, pass your access-authorized Hugging
                        Face token to the gated models.</p>
                      <div class="highlight-shell notranslate">
                        <div class="highlight">
                          <pre><span></span>OSError:<span class="w"> </span>You<span class="w"> </span>are<span
                              class="w"> </span>trying<span class="w"> </span>to<span class="w"> </span>access<span
                              class="w"> </span>a<span class="w"> </span>gated<span class="w"> </span>repo.

                            <span class="c1"># pass your HF_TOKEN</span>
                            <span class="nb">export</span><span class="w"> </span><span class="nv">HF_TOKEN</span><span
                              class="o">=</span><span class="nv">$your_personal_hf_token</span>
                          </pre>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section id="options">
                    <span id="vllm-benchmark-standalone-options"></span>
                    <h3>Options<a class="headerlink" href="#options" title="Link to this heading">#</a></h3>
                    <div class="pst-scrollable-table-container">
                      <table class="table table-center">
                        <thead>
                          <tr class="row-odd">
                            <th class="head">
                              <p>Name</p>
                            </th>
                            <th class="head">
                              <p>Option</p>
                            </th>
                            <th class="head">
                              <p>Description</p>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="row-even">
                            <td>
                              <p><code class="docutils literal notranslate"><span class="pre">$test_option</span></code>
                              </p>
                            </td>
                            <td>
                              <p>latency</p>
                            </td>
                            <td>
                              <p>Measure decoding token latency</p>
                            </td>
                          </tr>
                          <tr class="row-odd">
                            <td></td>
                            <td>
                              <p>throughput</p>
                            </td>
                            <td>
                              <p>Measure token generation throughput</p>
                            </td>
                          </tr>
                          <tr class="row-even">
                            <td></td>
                            <td>
                              <p>all</p>
                            </td>
                            <td>
                              <p>Measure both throughput and latency</p>
                            </td>
                          </tr>
                          <tr class="row-odd">
                            <td>
                              <p><code class="docutils literal notranslate"><span class="pre">$num_gpu</span></code></p>
                            </td>
                            <td>
                              <p>1 or 8</p>
                            </td>
                            <td>
                              <p>Number of GPUs</p>
                            </td>
                          </tr>
                          <tr class="row-even">
                            <td>
                              <p><code class="docutils literal notranslate"><span class="pre">$datatype</span></code>
                              </p>
                            </td>
                            <td>
                              <p><code class="docutils literal notranslate"><span class="pre">float16</span></code> or
                                <code class="docutils literal notranslate"><span class="pre">float8</span></code></p>
                            </td>
                            <td>
                              <p>Data type</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>
                  <section id="running-the-benchmark-on-the-mi300x-accelerator">
                    <span id="vllm-benchmark-run-benchmark"></span>
                    <h3>Running the benchmark on the MI300X accelerator<a class="headerlink"
                        href="#running-the-benchmark-on-the-mi300x-accelerator" title="Link to this heading">#</a></h3>
                    <p>Here are some examples of running the benchmark with various options.
                      See <a class="reference internal" href="#vllm-benchmark-standalone-options"><span
                          class="std std-ref">Options</span></a> for the list of
                      options and their descriptions.</p>
                    <section id="example-1-latency-benchmark">
                      <h4>Example 1: latency benchmark<a class="headerlink" href="#example-1-latency-benchmark"
                          title="Link to this heading">#</a></h4>
                      <p>Use this command to benchmark the latency of the {{model.model}} model on eight GPUs with the
                        <code class="docutils literal notranslate"><span class="pre">{{model.precision}}</span></code> data type.</p>
                      <div class="highlight-default notranslate">
                        <div class="highlight">
                          <pre>
                           <span>./vllm_benchmark_report.sh -s latency -m {{model.model_repo}} -g 8 -d {{model.precision}}</span>
                          </pre>
                        </div>
                      </div>
                      <p>Find the latency reports at:</p>
                      <ul class="simple">
                        <li>
                          <p><code class="docutils literal notranslate"><span
                                class="pre">./reports_float16/summary/{{model.model_repo}}_latency_report.csv</span></code>
                          </p>
                        </li>
                        <li>
                          <p><code class="docutils literal notranslate"><span
                                class="pre">./reports_float8/summary/{{model.model_repo}}_latency_report.csv</span></code>
                          </p>
                        </li>
                      </ul>
                    </section>
                    <section id="example-2-throughput-benchmark">
                      <h4>Example 2: throughput benchmark<a class="headerlink" href="#example-2-throughput-benchmark"
                          title="Link to this heading">#</a></h4>
                      <p>Use this command to benchmark the throughput of the {{model.model}} model on eight GPUs with the
                        <code class="docutils literal notranslate"><span class="pre">{{model.precision}}</span></code> data type.</p>
                      <div class="highlight-shell notranslate">
                        <div class="highlight">
                          <pre>
                           <span>./vllm_benchmark_report.sh -s throughput -m {{model.model_repo}} -g 8 -d {{model.precision}}</span>
                          </pre>
                        </div>
                      </div>
                      <p>Find the throughput reports at:</p>
                      <ul class="simple">
                        <li>
                          <p><code class="docutils literal notranslate"><span
                                class="pre">./reports_float16/summary/{{model.model_repo}}_throughput_report.csv</span></code>
                          </p>
                        </li>
                        <li>
                          <p><code class="docutils literal notranslate"><span
                                class="pre">./reports_float8/summary/{{model.model_repo}}_throughput_report.csv</span></code>
                          </p>
                        </li>
                      </ul>
                    </section>
                  </section>
                </section>
   {% endfor %}
   {% endfor %}


.. raw:: html

   <style>
   mjx-container[jax="CHTML"][display="true"] {
       text-align: left;
       margin: 0;
   }
   </style>

.. note::

   Throughput is calculated as:

   - .. math:: throughput\_tot = requests \times (\mathsf{\text{input lengths}} + \mathsf{\text{output lengths}}) / elapsed\_time

   - .. math:: throughput\_gen = requests \times \mathsf{\text{output lengths}} / elapsed\_time

Further reading
===============

- For application performance optimization strategies for HPC and AI workloads,
  including inference with vLLM, see :doc:`../inference-optimization/workload`.

- To learn more about the options for latency and throughput benchmark scripts,
  see `<https://github.com/ROCm/vllm/tree/main/benchmarks>`_.

- To learn more about system settings and management practices to configure your system for
  MI300X accelerators, see :doc:`../../system-optimization/mi300x`.

- To learn how to run LLM models from Hugging Face or your own model, see
  :doc:`Running models from Hugging Face <hugging-face-models>`.

- To learn how to optimize inference on LLMs, see
  :doc:`Inference optimization <../inference-optimization/index>`.

- To learn how to fine-tune LLMs, see
  :doc:`Fine-tuning LLMs <../fine-tuning/index>`.
