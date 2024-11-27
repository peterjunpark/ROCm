// @ts-check
/**
 * @typedef {"compute" | "graphics"} UseCase
 * @typedef {"instinct" | "radeon-pro" | "radeon"} GPU
 * @typedef {"ubuntu" | "debian" | "rhel" | "sles" | "oracle-linux" | "azure-linux" | "windows" | "wsl-ubuntu"} OS
 * @typedef {"rocm" | "hip-sdk"} Stack
 * @typedef {"6.3.1" | "6.3.0" | "6.2.4" | "6.2.3"} CompareVer
 * @typedef {"useCase" | "gpu" | "os" | "stack" | "compareVer"} ParamKey
 *
 * @typedef {Object} CompatMatrixParams
 * @property {UseCase[]} useCase - The selected use case(s).
 * @property {GPU[]} gpu - The selected GPU(s).
 * @property {OS[]} os - The selected operating system(s).
 * @property {Stack[]} stack - The selected software stack(s).
 * @property {CompareVer[]} compareVer - The selected ROCm version(s).
 *
 * @typedef {Object} CompatMatrixConfigEntry
 * @property {ParamKey} key - The list of valid keys.
 * @property {readonly string[]} valid - The list of valid values. The first element is the DEFAULT value.
 * @property {boolean} multi - Whether multiple values are allowed.
 *
 * @typedef {Object} CompatMatrixConfig
 * @property {CompatMatrixConfigEntry} useCase - Configuration for use cases.
 * @property {CompatMatrixConfigEntry} gpu - Configuration for GPUs.
 * @property {CompatMatrixConfigEntry} os - Configuration for operating systems.
 * @property {CompatMatrixConfigEntry} stack - Configuration for software stacks.
 * @property {CompatMatrixConfigEntry} compareVer - Configuration for ROCm versions.
 */

// TODO: Pull in the config from external
/** @type {CompatMatrixConfig} */
const CONFIG = {
    useCase: {
        key: "useCase",
        valid: ["compute", "graphics"],
        multi: false,
    },
    gpu: {
        key: "gpu",
        valid: ["instinct", "radeon-pro", "radeon"],
        multi: false,
    },
    os: {
        key: "os",
        valid: [
            "ubuntu",
            "debian",
            "rhel",
            "sles",
            "oracle-linux",
            "azure-linux",
            "windows",
            "wsl-ubuntu",
        ],
        multi: true,
    },
    stack: {
        key: "stack",
        valid: ["rocm", "hip-sdk"],
        multi: false,
    },
    compareVer: {
        key: "compareVer",
        valid: ["6.3.1", "6.3.0", "6.2.4", "6.2.3"],
        multi: false,
    },
};

/**
 * @typedef {"selected"} Selected
 * @typedef {"disabled"} Disabled
 *
 * @typedef {Object} DataAttributes
 * @property {"data-param-k"} selectorKey - The HTML data attribute that stores its associated search param key.
 * @property {"data-param-v"} selectorVal - The HTML data attribute that stores its associated search param value.
 * @property {"data-param-state"} selectorState - The HTML data attribute that stores its associated state: "disabled" or "selected". If
 * a param selector doesn't have this attribute, it is enabled but not selected.
 * @property {"data-templ-k"} templKey - The HTML data attribute marks a template with its associated search param key.
 * @property {"data-templ-v"} templVal - The value for the template attribute.
 * @property {Selected} selected - Indicates the selected state.
 * @property {Disabled} disabled - Indicates the disabled state.
 * @property {null} enabled - Indicates the enabled state.
 */

/** @type {DataAttributes} */
const DATA_ATTRS = {
    selectorKey: "data-param-k",
    selectorVal: "data-param-v",
    selectorState: "data-param-state",
    templKey: "data-templ-k",
    templVal: "data-templ-v",
    selected: "selected",
    disabled: "disabled",
    enabled: null,
};

/**
 * Filters a list of params, ensuring they are valid, unique, and providing defaults if empty.
 * @template {string} T
 * @param {T[]} paramVals - The input parameters to be validated.
 * @param {CompatMatrixConfigEntry} paramConfig - The list of valid values and defaults.
 * @returns {T[]} - A filtered and unique list of valid parameters, or the default values if none are valid.
 */
function scrubParamVals(paramVals, paramConfig) {
    // Filter and deduplicate valid parameters
    const filteredVals = paramVals.filter((val) =>
        paramConfig.valid.includes(val)
    );
    const uniqueVals = [...(new Set(filteredVals))];
    const numVals = uniqueVals.length;

    return numVals
        ? uniqueVals
        : /** @type {T[]} */ ([...[paramConfig.valid[0]]]);
}

/**
 * Gets search parameters from the URL. Ensures that the returned parameters are valid, unique, and fall back to default values if invalid.
 * @returns {CompatMatrixParams} The cleaned-up URL search parameters.
 */
function getSearchParams() {
    const urlParams = new URLSearchParams(globalThis.location.search);

    return {
        useCase: /** @type {UseCase[]} */ (scrubParamVals(
            urlParams.getAll("useCase"),
            CONFIG.useCase,
        )),
        gpu: /** @type {GPU[]} */ (scrubParamVals(
            urlParams.getAll("gpu"),
            CONFIG.gpu,
        )),
        os: /** @type {OS[]} */ (scrubParamVals(
            urlParams.getAll("os"),
            CONFIG.os,
        )),
        stack: /** @type {Stack[]} */ (scrubParamVals(
            urlParams.getAll("stack"),
            CONFIG.stack,
        )),
        compareVer: /** @type {CompareVer[]} */ (scrubParamVals(
            urlParams.getAll("compareVer"),
            CONFIG.compareVer,
        )),
    };
}

/**
 * Sets the URL search parameters in the navi.
 * @param {CompatMatrixParams} params - The parameters to be set in the URL.
 */
function setSearchParams(params) {
    const urlParams = new URLSearchParams();

    // Iterate through each parameter and add its value(s) to the URL
    for (const [key, vals] of Object.entries(params)) {
        vals.forEach((val) => urlParams.append(key, val));
    }

    // Update the browser history with the new query string
    globalThis.history.replaceState(
        {},
        "",
        `${globalThis.location.pathname}?${urlParams.toString()}`,
    );
}

function rm(arr, ...vals) {
    vals.forEach((val) => {
        const idx = arr.indexOf(val);
        if (idx !== -1) {
            arr.splice(idx, 1);
        }
    });

    return arr;
}

/**
 * @param {CompatMatrixParams} params
 * @param {NodeListOf<Element>} compatParamBtns
 */
function setCompatParamSelector(params, compatParamBtns) {
    // Reset param selector
    compatParamBtns.forEach((el) => {
        const state = el.getAttribute(DATA_ATTRS.selectorState);
        if (state !== "latest-version") {
            el.removeAttribute(DATA_ATTRS.selectorState);
        }
    });

    let { useCase, gpu, os } = params;

    compatParamBtns.forEach((selector) => {
        const selectorKey = /** @type {ParamKey} */ (selector.getAttribute(
            DATA_ATTRS.selectorKey,
        ));
        const selectorVal = selector.getAttribute(DATA_ATTRS.selectorVal);
        if (!selectorKey || !selectorVal) {
            return;
        }

        /** @param {Selected | Disabled} state */
        const setAttr = (state) => {
            selector.setAttribute(DATA_ATTRS.selectorState, state);
        };

        // Highlight selected selectors.
        for (const urlVal of params[selectorKey]) {
            if (urlVal === selectorVal) {
                setAttr(DATA_ATTRS.selected);
            }
        }

        // FIXME: make this configurable via CONFIG
        // Grey out disabled selectors
        if (useCase.includes("compute")) {
            if (gpu.includes("instinct")) {
                if (
                    selectorKey === "os" &&
                    ["windows", "wsl-ubuntu"].includes(selectorVal)
                ) {
                    setAttr(DATA_ATTRS.disabled);
                }

                if (selectorKey === "stack" && selectorVal === "hip-sdk") {
                    setAttr(DATA_ATTRS.disabled);
                }
            } else { // not instinct
                if (
                    selectorKey === "os" &&
                    ["oracle-linux", "azure-linux", "debian"].includes(
                        selectorVal,
                    )
                ) {
                    setAttr(DATA_ATTRS.disabled);
                }

                if (os.includes("windows")) {
                    if (selectorKey === "stack" && selectorVal === "rocm") {
                        setAttr(DATA_ATTRS.disabled);
                    }
                }
            }
        } else if (useCase.includes("graphics")) {
            // FIXME

            if (selectorKey === "gpu" && selectorVal === "instinct") {
                setAttr(DATA_ATTRS.disabled);
            }

            if (selectorKey === "os" && selectorVal !== "ubuntu") {
                setAttr(DATA_ATTRS.disabled);
            }

            if (selectorKey === "stack" && selectorVal === "hip-sdk") {
                setAttr(DATA_ATTRS.disabled);
            }

            if (selectorKey === "compareVer" && selectorVal !== "6.2.3") {
                setAttr(DATA_ATTRS.disabled);
            }
        }
    });
}

/**
 * @param {CompatMatrixParams} params
 * @param {Element} compatMatrix
 * @param {NodeListOf<HTMLTemplateElement>} compatMatrixTemplates
 */
// TODO:
function setCompatMatrix(params, compatMatrix, compatMatrixTemplates) {
    console.log("setting compat matrix");
    compatMatrix.querySelectorAll("[data-tr-state=clone]").forEach(
        (child) => {
            child.remove();
        },
    );

    compatMatrixTemplates.forEach((templ) => {
        const templKey =
            /** @type {ParamKey} */ (templ.getAttribute("data-templ-k"));
        const templVal = templ.getAttribute("data-templ-v");
        const parent = templ.parentNode;

        if (!parent || !templKey) {
            return;
        }

        params[templKey].forEach((p) => {
            if (p === templVal) {
                const clone = templ.content.cloneNode(true);

                if (clone instanceof DocumentFragment) {
                    const firstChild = clone.firstElementChild;

                    if (firstChild) {
                        firstChild.setAttribute(
                            "data-tr-state",
                            "clone",
                        );
                    }
                }

                parent.appendChild(clone);
            }
        });
    });

    const compatMatrixCompareVerHeading = compatMatrix
        .querySelector("span#compat-matrix-compare-ver-heading");
    setStackVerHeadings(
        params.stack,
        params.compareVer,
        params.useCase,
        compatMatrixCompareVerHeading,
    );

    const compatMatrixGPUHeading = compatMatrix
        .querySelector(
            "span#compat-matrix-gpu-heading",
        );
    const compatSidebarGPUHeading = document.querySelector(
        "nav.page-toc li.toc-entry a#compat-sidebar-gpu-heading",
    );
    setGPUHeadings(
        params.gpu,
        compatMatrixGPUHeading,
        compatSidebarGPUHeading,
    );
}
/**
 * Sets the appropriate heading in the accelerators/GPUs section of the
 * compatibility matrix and the secondary TOC sidebar.
 * @param {Stack[]} stackParams
 * @param {CompareVer[]} verParams
 * @param {UseCase[]} useCaseParams
 * @param {Array<Element | null>} elements
 */
function setStackVerHeadings(
    stackParams,
    verParams,
    useCaseParams,
    ...elements
) {
    elements.forEach((el) => {
        if (!el) return;

        //TODO support multi
        const stackText = stackParams[0];
        const verText = verParams[0];
        const useCase = useCaseParams[0];

        switch (true) {
            case stackText === "rocm" && useCase === "graphics":
                el.textContent = `ROCm on Radeon ${verText}`;
                break;
            case stackText === "rocm":
                el.textContent = `ROCm ${verText}`;
                break;
            case stackText === "hip-sdk":
                el.textContent = `HIP SDK ${verText}`;
                break;
        }
    });
}

/**
 * Sets the appropriate heading in the accelerators/GPUs section of the
 * compatibility matrix and the secondary TOC sidebar.
 * @param {GPU[]} gpuParams
 * @param {Array<Element | null>} elements
 */
function setGPUHeadings(gpuParams, ...elements) {
    elements.forEach((el) => {
        if (!el) return;

        if (gpuParams.length === 1) {
            switch (gpuParams[0]) {
                case "instinct":
                    el.textContent = "Supported Instinct accelerators";
                    break;
                case "radeon-pro":
                    el.textContent = "Supported Radeon PRO GPUs";
                    break;
                case "radeon":
                    el.textContent = "Supported Radeon GPUs";
                    break;
                default:
                    el.textContent = "Supported hardware";
            }
        } else {
            el.textContent = "Supported hardware";
        }
    });
}

/** @param {() => void} proc */
function ready(proc) {
    if (document.readyState !== "loading") {
        proc();
        return;
    }
    document.addEventListener("DOMContentLoaded", proc);
}

// Entry point
ready(function () {
    const compatParamSelector = document.querySelector(
        "div#compat-params-selector",
    );
    const compatMatrix = document.querySelector("table#compat-matrix");
    if (!compatParamSelector || !compatMatrix) {
        console.error("Compatibility matrix: params or table not found.");
        return;
    }
    const compatParamBtns = compatParamSelector.querySelectorAll(
        "div.compat-param",
    );
    const compatMatrixTemplates = compatMatrix.querySelectorAll("template");
    const latestVersion = compatParamSelector.getAttribute("data-latest");
    if (!latestVersion) {
        console.error("Compatibility matrix: can't find latest version.");
    }

    // On page load, get the search params from the URL.
    const initialParams = getSearchParams();
    setSearchParams(initialParams);
    // Update the URL with the scrubbed search params.
    setCompatParamSelector(initialParams, compatParamBtns);
    setCompatMatrix(initialParams, compatMatrix, compatMatrixTemplates);

    // Init selectors.
    compatParamBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const selectorKey =
                /** @type {ParamKey} */ (btn.getAttribute("data-param-k"));
            const selectorVal = btn.getAttribute("data-param-v");
            const selectorState = btn.getAttribute("data-param-state");

            // Ignore invalid or disabled selectors
            if (
                !selectorKey || !selectorVal ||
                selectorState === DATA_ATTRS.disabled
            ) return;

            const params = getSearchParams();
            const paramVals = /** @type {string[]} */ (params[selectorKey]);

            // Handle multi-select params.
            if (CONFIG[selectorKey].multi) {
                // Handle deselect.
                if (
                    selectorState === DATA_ATTRS.selected &&
                    paramVals.length > 1
                ) {
                    // Remove value from the array.
                    const index = paramVals.indexOf(
                        selectorVal,
                    ); // FIXME
                    // If the value exists in the array, remove it
                    if (index !== -1) {
                        paramVals.splice(index, 1);
                    }
                } else {
                    // Handle select
                    paramVals.push(selectorVal);
                }
            } else if (!CONFIG[selectorKey].multi && paramVals.length === 1) {
                // Handle single-select params.
                paramVals.pop();
                paramVals.push(selectorVal);
            }

            // FIXME
            switch (selectorVal) {
                case "compute":
                    params.gpu = ["instinct"];
                    break;
                case "graphics":
                    params.gpu = ["radeon-pro"];
                    params.os = ["ubuntu"];
                    params.stack = ["rocm"];
                    params.compareVer = ["6.2.3"];
                    break;
                case "instinct":
                    rm(params.os, "windows", "wsl-ubuntu");
                    params.stack = ["rocm"];
                    break;
                case "radeon-pro":
                case "radeon":
                    rm(params.os, "oracle-linux", "debian", "azure-linux");
                    break;
                case "windows":
                    params.os = ["windows"];
                    params.stack = ["hip-sdk"];
                    break;
                case "ubuntu":
                case "rhel":
                case "sles":
                case "oracle-linux":
                case "debian":
                case "wsl-ubuntu":
                    rm(params.os, "windows");
                    params.stack = ["rocm"];
            }

            setSearchParams(params);
            setCompatParamSelector(params, compatParamBtns);
            setCompatMatrix(params, compatMatrix, compatMatrixTemplates);
        });
    });
});
