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

    const modelGroups = modelPicker.querySelectorAll('div[data-param-k="model-group"][data-param-v]');
    const modelParams = modelPicker.querySelectorAll('div[data-param-k="model"][data-param-v]');
    const modelDocs = document.querySelectorAll('div.model-doc');

    // Get initial model group based on selected/default model
    function getInitialModelGroup(currentModel) {
        if (!currentModel) return null;
        const selectedModel = Array.from(modelParams).find(
            model => model.getAttribute("data-param-v") === currentModel
        );
        return selectedModel ? selectedModel.getAttribute("data-param-group") : null;
    }

    // Get the first model in a given group
    function getFirstModelInGroup(groupTag) {
        const firstModel = Array.from(modelParams).find(
            model => model.getAttribute("data-param-group") === groupTag
        );
        return firstModel ? firstModel.getAttribute("data-param-v") : null;
    }

    modelGroups.forEach(group => {
        const modelGroupTag = group.getAttribute("data-param-v");
        group.addEventListener("click", () => {
            // First update the group display
            setModelGroup(modelGroupTag);
            // Update group selection UI
            modelGroups.forEach(g => {
                if (g.getAttribute("data-param-v") === modelGroupTag) {
                    g.setAttribute("data-param-state", "selected");
                } else {
                    g.removeAttribute("data-param-state");
                }
            });
            // Select the first model in the new group
            const firstModelInGroup = getFirstModelInGroup(modelGroupTag);
            if (firstModelInGroup) {
                setModelSearchParam(firstModelInGroup);
                setModelPicker(firstModelInGroup);
                setModelDocs(firstModelInGroup);
            }
        });
    });

    modelParams.forEach((model) => {
        const modelTag = model.getAttribute("data-param-v");
        const groupTag = model.getAttribute("data-param-group");
        availableModels.add(modelTag);

        model.addEventListener("click", () => {
            setModelSearchParam(modelTag);
            setModelGroup(groupTag);
            setModelPicker(modelTag);
            setModelDocs(modelTag);
        });
    });

    function setModelGroup(selectedGroup) {
        if (!selectedGroup) return;

        modelParams.forEach(model => {
            const group = model.getAttribute("data-param-group");
            model.style.display = group === selectedGroup ? "block" : "none";
        });
    }

    function setModelPicker(selectedModel) {
        modelParams.forEach((model) => {
            if (model.getAttribute("data-param-v") === selectedModel) {
                model.setAttribute("data-param-state", "selected");
            } else {
                model.removeAttribute("data-param-state");
            }
        });
    }

    function setModelDocs(selectedModel) {
		// Convert non-alphanumeric chars to hyphens. Because Sphinx does this to classes.
		const formatted = selectedModel.replace(/[^a-zA-Z0-9]/g, '-');
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

    // Initialize the state
    let currentModel = getModelSearchParam();
    currentModel = setModelSearchParam(currentModel);
    const initialGroup = getInitialModelGroup(currentModel);
    setModelGroup(initialGroup);
    setModelPicker(currentModel);
    setModelDocs(currentModel);

    // Set initial group selection UI
    if (initialGroup) {
        modelGroups.forEach(group => {
            if (group.getAttribute("data-param-v") === initialGroup) {
                group.setAttribute("data-param-state", "selected");
            }
        });
    }
});
