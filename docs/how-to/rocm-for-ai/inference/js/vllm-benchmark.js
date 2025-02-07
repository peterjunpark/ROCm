const availableModels = new Set();

function getModelSearchParam() {
    const searchParams = new URLSearchParams(globalThis.location.search);
    const currModel = searchParams.get("model");
    return currModel;
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
    const modelPicker = document.getElementById(
        "vllm-benchmark-ud-params-picker",
    );
    if (!modelPicker) {
        return;
    }

    const modelParams = modelPicker.querySelectorAll(
        'div[data-param-k="model"][data-param-v]',
    );
    const modelDocs = document.querySelectorAll(
        'section[data-param-k="model"][data-param-v]',
    );

    modelParams.forEach((model) => {
        const modelTag = model.getAttribute("data-param-v");
        availableModels.add(modelTag);

        model.addEventListener("click", () => {
            setModelSearchParam(modelTag);
            setModelPicker(modelTag);
            setModelDocs(modelTag);
        });
    });

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
        modelDocs.forEach((doc) => {
            const modelTag = doc.getAttribute("data-param-v");
            if (doc.getAttribute("data-param-v") !== selectedModel) {
				doc.style.display = "none";
            } else {
				doc.style.display = "block";
			}
        });
    }

    function setModelSearchParam(modelTag) {
        const [defaultModel] = availableModels;
        const model = availableModels.has(modelTag) ? modelTag : defaultModel;
        const searchParams = new URLSearchParams({ model });

        // Update the browser history with the new query string
        globalThis.history.replaceState(
            {},
            "",
            `${globalThis.location.pathname}?${searchParams.toString()}`,
        );
        return model;
    }

    let p = getModelSearchParam();
    p = setModelSearchParam(p);
    setModelPicker(p);
    setModelDocs(p);
});
