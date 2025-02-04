// @ts-check
/**
 * @typedef {"compute" | "graphics"} UseCase
 * @typedef {"instinct" | "radeon-pro" | "radeon"} GPU
 * @typedef {"ubuntu" | "debian" | "rhel" | "sles" | "oracle-linux" | "azure-linux" | "windows" | "wsl-ubuntu"} OS
 * @typedef {string} CompareVer
 * @typedef {"useCase" | "gpu" | "os" | "compareVer"} ParamKey
 *
 * @typedef {Object} CompatMatrixParams
 * @property {UseCase[]} useCase - The selected use case(s).
 * @property {GPU[]} gpu - The selected GPU(s).
 * @property {OS[]} os - The selected operating system(s).
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
    compareVer: {
        key: "compareVer",
        valid: ["6.3.1", "6.3.0", "6.2.4", "6.2.3", "6.2.2", "6.1.2", "6.0.2"],
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

    const returnv = numVals
        ? uniqueVals
        : /** @type {T[]} */ ([...[paramConfig.valid[0]]]);

    return returnv;
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

/** Removes an element of an array in place.
 * @param {string[]} arr @param {string[]} vals */
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

    const { useCase, gpu, os } = params;

    const compatParamLinuxVers = document.getElementById(
        "compat-param-rocm-linux",
    );
    const compatParamWindowsVers = document.getElementById(
        "compat-param-rocm-windows",
    );
    const compatParamRadeonVers = document.getElementById(
        "compat-param-rocm-radeon",
    );

    if (
        !compatParamLinuxVers || !compatParamWindowsVers ||
        !compatParamRadeonVers
    ) {
        console.log("can't find linux, windows, radeon version rows");
    } else {
        if (useCase[0] === "graphics") {
            compatParamLinuxVers.style.display = "none";
            compatParamWindowsVers.style.display = "none";
            compatParamRadeonVers.style.display = "flex";
        } else {
            if (os[0] === "windows") {
                compatParamLinuxVers.style.display = "none";
                compatParamWindowsVers.style.display = "flex";
                compatParamRadeonVers.style.display = "none";
            } else {
                compatParamLinuxVers.style.display = "flex";
                compatParamWindowsVers.style.display = "none";
                compatParamRadeonVers.style.display = "none";
            }
        }
    }

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
            } else { // not instinct
                if (
                    selectorKey === "os" &&
                    ["oracle-linux", "azure-linux", "debian"].includes(
                        selectorVal,
                    )
                ) {
                    setAttr(DATA_ATTRS.disabled);
                }
            }
        } else if (useCase.includes("graphics")) {
            // FIXME

            if (selectorKey === "gpu" && selectorVal === "instinct") {
                setAttr(DATA_ATTRS.disabled);
            }

            if (
                selectorKey === "os" && selectorVal !== "ubuntu" &&
                selectorVal !== "wsl-ubuntu"
            ) {
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
    compatMatrix.querySelectorAll("[data-templ-state=clone]").forEach(
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
                    Array.from(clone.children).forEach((child) => {
                        child.setAttribute("data-templ-state", "clone");
                    });
                }

                parent.appendChild(clone);
            }
        });
    });
}
/**
 * Sets the appropriate heading in the accelerators/GPUs section of the
 * compatibility matrix and the secondary TOC sidebar.
 * @param {string} latestVer
 * @param {CompareVer[]} verParams
 * @param {OS[]} osParams
 * @param {Array<Element | null>} elements
 */
function displayStackAndVerHeadings(
    latestVer,
    verParams,
    osParams,
    ...elements
) {
    elements.forEach((el) => {
        if (!el) return;

        //TODO support multi
        const os = osParams[0];
        const compareVer = verParams[0];

        if (el.id === "compat-matrix-latest-ver-heading") {
            el.textContent = os === "windows"
                ? latestVer
                : `${latestVer} (latest)`;
        } else if (el.id === "compat-matrix-stack-heading") {
            el.textContent = os === "windows"
                ? "ROCm on Windows"
                : "ROCm on Linux";
        } else {
            el.textContent = compareVer;
        }
    });
}

/**
 * Sets the appropriate heading in the accelerators/GPUs section of the
 * compatibility matrix and the secondary TOC sidebar.
 * @param {GPU[]} gpuParams
 * @param {Array<Element | null>} elements
 */
function displayGPUHeadings(gpuParams, ...elements) {
    elements.forEach((el) => {
        if (!el) return;

        if (gpuParams.length === 1) {
            switch (gpuParams[0]) {
                case "instinct":
                    el.textContent = "Supported AMD Instinct™ accelerators";
                    break;
                case "radeon-pro":
                    el.textContent = "Supported AMD Radeon™ PRO GPUs";
                    break;
                case "radeon":
                    el.textContent = "Supported AMD Radeon™ GPUs";
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
    const compatMatrixTemplates = document.querySelectorAll("template");
    const latestVerLinux = compatParamSelector.getAttribute("data-latest");
    const latestVerWindows = compatParamSelector.getAttribute(
        "data-latest-windows",
    );

    if (!latestVerLinux || !latestVerWindows) {
        return;
    }

    const compatMatrixCompareVerHeading = compatMatrix
        .querySelector("span#compat-matrix-compare-ver-heading");
    const compatMatrixLatestVerHeading = compatMatrix.querySelector(
        "span#compat-matrix-latest-ver-heading",
    );
    const compatMatrixGPUHeading = compatMatrix
        .querySelector(
            "span#compat-matrix-gpu-heading",
        );
    const compatSidebarGPUHeading = document.querySelector(
        "nav.page-toc li.toc-entry a#compat-sidebar-gpu-heading",
    );
    const compatMatrixStackHeading = compatMatrix.querySelector(
        "span#compat-matrix-stack-heading",
    );

    // On page load, get the search params from the URL.
    const initialParams = getSearchParams();
    setSearchParams(initialParams);
    // Update the URL with the scrubbed search params.
    setCompatParamSelector(initialParams, compatParamBtns);
    setCompatMatrix(initialParams, compatMatrix, compatMatrixTemplates);

    displayStackAndVerHeadings(
        latestVerLinux,
        initialParams.compareVer,
        initialParams.os,
        compatMatrixLatestVerHeading,
        compatMatrixCompareVerHeading,
        compatMatrixStackHeading,
    );

    displayGPUHeadings(
        initialParams.gpu,
        compatMatrixGPUHeading,
        compatSidebarGPUHeading,
    );

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
                // FIXME: Handle deselect.
                if (
                    selectorState === DATA_ATTRS.selected &&
                    paramVals.length > 0
                ) {
                    // Remove value from the array.
                    rm(paramVals, selectorVal);
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
                    params.compareVer = ["6.2.3"];
                    break;
                case "instinct":
                    rm(params.os, "windows", "wsl-ubuntu");
                    break;
                case "radeon-pro":
                case "radeon":
                    rm(params.os, "oracle-linux", "debian", "azure-linux");
                    break;
                case "windows":
                    params.os = ["windows"];
                    params.compareVer = ["6.0.2"];
                    break;
                case "ubuntu":
                case "wsl-ubuntu":
                    rm(params.os, "windows");
                    break;
                case "rhel":
                case "sles":
                case "oracle-linux":
                case "debian":
                    rm(params.os, "windows");
                    params.compareVer = ["6.3.1"];
            }
            if (!params.os.length) params.os = ["ubuntu"];

            setSearchParams(params);
            setCompatParamSelector(params, compatParamBtns);
            setCompatMatrix(params, compatMatrix, compatMatrixTemplates);

            const compatMatrixCompareVerHeading = compatMatrix
                .querySelector("span#compat-matrix-compare-ver-heading");
            const compatMatrixLatestVerHeading = compatMatrix.querySelector(
                "span#compat-matrix-latest-ver-heading",
            );
            const compatMatrixStackHeading = compatMatrix.querySelector(
                "span#compat-matrix-stack-heading",
            );

            let latestVer;
            if (params.os.length === 1 && params.os[0] === "windows") {
                latestVer = latestVerWindows;
            } else {
                latestVer = latestVerLinux;
            }

            displayStackAndVerHeadings(
                latestVer,
                params.compareVer,
                params.os,
                compatMatrixLatestVerHeading,
                compatMatrixCompareVerHeading,
                compatMatrixStackHeading,
            );

            const compatMatrixGPUHeading = compatMatrix
                .querySelector(
                    "span#compat-matrix-gpu-heading",
                );
            const compatSidebarGPUHeading = document.querySelector(
                "nav.page-toc li.toc-entry a#compat-sidebar-gpu-heading",
            );
            displayGPUHeadings(
                params.gpu,
                compatMatrixGPUHeading,
                compatSidebarGPUHeading,
            );
        });
    });
});
