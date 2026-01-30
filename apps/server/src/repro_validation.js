
// Mock Enum and Constants
const UnitProblemFeedbackType = {
    INCORRECT: 'INCORRECT',
    SERVICE_MISSING: 'SERVICE_MISSING',
    FIELD_MISSING: 'FIELD_MISSING',
    UNNECESSARY: 'UNNECESSARY',
};

const feedbackMessages = {
    INCORRECT: (service, item) => `INCORRECT: ${service} - ${item}`,
    SERVICE_MISSING: (service, item) => `MISSING: ${service} - ${item}`,
    FIELD_MISSING: (service, item) => `FIELD_MISSING: ${service} - ${item}`,
    UNNECESSARY: (service, item) => `UNNECESSARY: ${service} - ${item}`,
};

const UnitProblemValidateResult = {};

// --- Utils ---

function removeUndefined(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map((item) => removeUndefined(item));
    }

    const result = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            if (value !== undefined) {
                result[key] = removeUndefined(value);
            }
        }
    }
    return result;
}

function hasName(config) {
    return config !== null && typeof config === 'object' && 'name' in config;
}

function containsCidr(superCidr, subCidr) {
    // simplified mock
    return true;
}

// --- Validation Handler Class (Simulated) ---

class UnitValidationHandler {

    normalizeConfig(config, serviceKey) {
        const refined = removeUndefined(config);

        if (serviceKey === 'routeTable') {
            if (Array.isArray(refined.routes)) {
                refined.routes.sort((a, b) =>
                    (a.destinationCidr || '').localeCompare(b.destinationCidr || ''),
                );
            }
            if (Array.isArray(refined.associations)) {
                refined.associations.sort((a, b) =>
                    (a.subnetId || '').localeCompare(b.subnetId || ''),
                );
            }
        } else if (serviceKey === 'securityGroups') {
            if (Array.isArray(refined.ipPermissions)) {
                refined.ipPermissions.sort((a, b) => {
                    const check = (a.ipProtocol || '').localeCompare(b.ipProtocol || '');
                    if (check !== 0) return check;
                    const check2 = (a.fromPort || '').localeCompare(b.fromPort || '');
                    if (check2 !== 0) return check2;
                    return (a.toPort || '').localeCompare(b.toPort || '');
                });
            }
        }
        // ... (other services omitted)
        return refined;
    }

    diffServiceConfigs(answerConfigs, solutionConfigs, serviceKey) {
        const refinedAnswerConfigs = answerConfigs.map((config) =>
            this.normalizeConfig(config, serviceKey),
        );
        const normalizedSolutionConfigs = solutionConfigs.map((config) =>
            this.normalizeConfig(config, serviceKey),
        );

        const matchedAnswerIndices = new Set();
        const matchedSolutionIndices = new Set();

        for (let i = 0; i < refinedAnswerConfigs.length; i++) {
            for (let j = 0; j < normalizedSolutionConfigs.length; j++) {
                if (matchedAnswerIndices.has(i)) break;
                if (matchedSolutionIndices.has(j)) continue;

                if (
                    this.isConfigMatch(
                        refinedAnswerConfigs[i],
                        normalizedSolutionConfigs[j],
                        serviceKey,
                    )
                ) {
                    matchedAnswerIndices.add(i);
                    matchedSolutionIndices.add(j);
                }
            }
        }

        return {
            onlyInAnswer: refinedAnswerConfigs.filter(
                (_, i) => !matchedAnswerIndices.has(i),
            ),
            onlyInSolution: normalizedSolutionConfigs.filter(
                (_, i) => !matchedSolutionIndices.has(i),
            ),
        };
    }

    isConfigMatch(answer, solution, serviceKey) {
        return this.isDeepEqual(answer, solution);
    }

    isDeepEqual(obj1, obj2) {
        if (obj1 === obj2) return true;
        if (obj2 === 'DONT_CARE') return true;

        if (obj1 === null || obj2 === null || typeof obj1 !== typeof obj2) {
            return false;
        }

        if (typeof obj1 !== 'object') {
            return false;
        }

        if (obj1 instanceof Date && obj2 instanceof Date) {
            return obj1.getTime() === obj2.getTime();
        }

        if (Array.isArray(obj1) && Array.isArray(obj2)) {
            if (obj1.length !== obj2.length) return false;
            return obj1.every((item, index) => this.isDeepEqual(item, obj2[index]));
        }

        if (Array.isArray(obj1) || Array.isArray(obj2)) return false;

        const o1 = removeUndefined(obj1);
        const o2 = removeUndefined(obj2);
        const keys1 = Object.keys(o1);
        const keys2 = Object.keys(o2);

        if (keys1.length !== keys2.length) return false;

        return keys1.every((key) => {
            if (!Object.prototype.hasOwnProperty.call(o2, key)) return false;
            return this.isDeepEqual(o1[key], o2[key]);
        });
    }

    generateFeedbacks(validationInfo) {
        // Reduced implementation to check failures
        // ...
        return validationInfo;
    }
}

// --- Test Data ---

const securityGroupSolution = [
    {
        id: 'web-server-sg',
        name: 'web-server-sg',
        description: 'DONT_CARE',
        vpcId: 'cloud-craft-vpc',
        vpcName: 'cloud-craft-vpc',
        ipPermissions: [
            {
                ipProtocol: 'tcp',
                fromPort: '80',
                toPort: '80',
                cidrIp: '0.0.0.0/0',
                isInbound: true,
            },
            {
                ipProtocol: 'tcp',
                fromPort: '22',
                toPort: '22',
                cidrIp: '0.0.0.0/0',
                isInbound: true,
            },
        ],
    },
];

const securityGroupSubmission = [
    {
        "id": "web-server-sg",
        "name": "web-server-sg",
        "description": "",
        "vpcId": "cloud-craft-vpc",
        "vpcName": "cloud-craft-vpc",
        "ipPermissions": [
            {
                "ipProtocol": "tcp",
                "fromPort": "80",
                "toPort": "80",
                "cidrIp": "0.0.0.0/0",
                "isInbound": true
            },
            {
                "ipProtocol": "tcp",
                "fromPort": "22",
                "toPort": "22",
                "cidrIp": "0.0.0.0/0",
                "isInbound": true
            }
        ]
    }
];

// --- Execution ---

const handler = new UnitValidationHandler();

console.log("--- Running Security Group Validation ---");

const mismatchedConfigs = {};
const diffResult = handler.diffServiceConfigs(securityGroupSubmission, securityGroupSolution, 'securityGroups');

if (diffResult.onlyInAnswer.length > 0 || diffResult.onlyInSolution.length > 0) {
    console.log("Validation FAILED (Differences found)");
    console.log("Only in Answer:", JSON.stringify(diffResult.onlyInAnswer, null, 2));
    console.log("Only in Solution:", JSON.stringify(diffResult.onlyInSolution, null, 2));
} else {
    console.log("Validation PASSED (No difference found)");
}
