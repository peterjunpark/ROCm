const availableModels = new Set();

function getModelSearchParam() {
  const searchParams = new URLSearchParams(globalThis.location.search);
  return searchParams.get("model");
}

function ready(proc) {
  if (document.readyState !== "loading") {
    proc();
    return;
  }
  document.addEventListener("DOMContentLoaded", proc);
}

// Entry point
ready(function () {
  const modelPicker = document.getElementById("vllm-benchmark-ud-params-picker");
  if (!modelPicker) return;

  const modelGroups = modelPicker.querySelectorAll(
    'div[data-param-k="model-group"][data-param-v]'
  );
  const modelParams = modelPicker.querySelectorAll(
    'div[data-param-k="model"][data-param-v]'
  );
  const modelDocs = document.querySelectorAll("div.model-doc");

  const modelsByGroup = new Map();
  const modelMap = new Map();
  
  modelParams.forEach((model) => {
    const modelTag = model.getAttribute("data-param-v");
    const groupTag = model.getAttribute("data-param-group");

    availableModels.add(modelTag);
    modelMap.set(modelTag, model);

    if (!modelsByGroup.has(groupTag)) {
      modelsByGroup.set(groupTag, []);
    }
    modelsByGroup.get(groupTag).push(modelTag);

    model.addEventListener("click", () => {
      updateUI(modelTag, groupTag);
    });
  });

  modelGroups.forEach((group) => {
    const modelGroupTag = group.getAttribute("data-param-v");
    group.addEventListener("click", () => {
      const firstModelInGroup = modelsByGroup.get(modelGroupTag)?.[0];
      if (firstModelInGroup) {
        updateUI(firstModelInGroup, modelGroupTag);
      }
    });
  });

  function updateUI(modelTag, groupTag) {
    setModelSearchParam(modelTag);
    setModelGroup(groupTag);
    setModelPicker(modelTag);
    setModelDocs(modelTag);

    // Update group selection UI
    modelGroups.forEach((g) => {
      g.setAttribute(
        "data-param-state",
        g.getAttribute("data-param-v") === groupTag ? "selected" : ""
      );
    });
  }

  function getInitialModelGroup(currentModel) {
    if (!currentModel) return null;
    return modelMap.get(currentModel)?.getAttribute("data-param-group") || null;
  }

  function setModelGroup(selectedGroup) {
    if (!selectedGroup) return;
    modelParams.forEach((model) => {
      model.style.display =
        model.getAttribute("data-param-group") === selectedGroup
          ? "block"
          : "none";
    });
  }

  function setModelPicker(selectedModel) {
    modelParams.forEach((model) => {
      model.setAttribute(
        "data-param-state",
        model.getAttribute("data-param-v") === selectedModel ? "selected" : ""
      );
    });
  }

  function setModelDocs(selectedModel) {
    // Convert non-alphanumeric chars to hyphens. Because Sphinx does this to classes.
    const formatted = selectedModel.replace(/[^a-zA-Z0-9]/g, "-");
    modelDocs.forEach((doc) => {
      doc.style.display = doc.classList.contains(formatted) ? "block" : "none";
    });
  }

  function setModelSearchParam(modelTag) {
    const [defaultModel] = availableModels;
    const model = availableModels.has(modelTag) ? modelTag : defaultModel;
    const searchParams = new URLSearchParams({ model });

    globalThis.history.replaceState(
      {},
      "",
      `${globalThis.location.pathname}?${searchParams.toString()}`
    );
    return model;
  }

  // Initialize state
  let currentModel = getModelSearchParam();
  currentModel = setModelSearchParam(currentModel);
  const initialGroup = getInitialModelGroup(currentModel);
  
  // Initialize UI
  updateUI(currentModel, initialGroup);
});
