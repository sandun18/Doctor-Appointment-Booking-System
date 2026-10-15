"""
Smart Healthcare Platform — AI Evaluation Metrics Framework
Provides standardized evaluation routines for Healthcare ML models:
- Multi-class Macro F1, Precision, and Recall
- Critical Urgency Sensitivity (Minimizing False Negatives on life-threatening conditions)
- Latency benchmarking (P50, P95, P99 in milliseconds)
- Calibration & Confidence metrics
"""

import time
from typing import Dict, List, Any, Optional
import numpy as np


class HealthcareEvaluationMetrics:
    """
    Standardized metrics calculator tailored for healthcare decision support systems.
    Prioritizes patient safety by monitoring False Negative rates on critical cases.
    """

    TARGET_MACRO_F1 = 0.88
    TARGET_CRITICAL_RECALL = 0.95
    TARGET_MAX_LATENCY_MS = 200.0

    @staticmethod
    def calculate_classification_metrics(
        y_true: List[str],
        y_pred: List[str],
        labels: Optional[List[str]] = None
    ) -> Dict[str, Any]:
        """
        Calculates precision, recall, and F1 per class and macro average.
        """
        if labels is None:
            labels = sorted(list(set(y_true + y_pred)))

        per_class = {}
        macro_precisions = []
        macro_recalls = []
        macro_f1s = []

        for label in labels:
            tp = sum(1 for yt, yp in zip(y_true, y_pred) if yt == label and yp == label)
            fp = sum(1 for yt, yp in zip(y_true, y_pred) if yt != label and yp == label)
            fn = sum(1 for yt, yp in zip(y_true, y_pred) if yt == label and yp != label)

            precision = tp / (tp + fp) if (tp + fp) > 0 else 0.0
            recall = tp / (tp + fn) if (tp + fn) > 0 else 0.0
            f1 = (2 * precision * recall) / (precision + recall) if (precision + recall) > 0 else 0.0

            per_class[label] = {
                "precision": round(precision, 4),
                "recall": round(recall, 4),
                "f1_score": round(f1, 4),
                "support": sum(1 for yt in y_true if yt == label)
            }

            macro_precisions.append(precision)
            macro_recalls.append(recall)
            macro_f1s.append(f1)

        macro_f1 = float(np.mean(macro_f1s))
        macro_precision = float(np.mean(macro_precisions))
        macro_recall = float(np.mean(macro_recalls))

        return {
            "macro_f1": round(macro_f1, 4),
            "macro_precision": round(macro_precision, 4),
            "macro_recall": round(macro_recall, 4),
            "meets_f1_target": macro_f1 >= HealthcareEvaluationMetrics.TARGET_MACRO_F1,
            "target_macro_f1": HealthcareEvaluationMetrics.TARGET_MACRO_F1,
            "per_class": per_class
        }

    @staticmethod
    def evaluate_critical_recall(
        urgency_true: List[str],
        urgency_pred: List[str],
        critical_label: str = "CRITICAL"
    ) -> Dict[str, Any]:
        """
        Calculates Sensitivity (Recall) for CRITICAL emergency cases.
        Safety Rule: False Negatives on CRITICAL triage cases must be near zero.
        """
        tp = sum(1 for yt, yp in zip(urgency_true, urgency_pred) if yt == critical_label and yp == critical_label)
        fn = sum(1 for yt, yp in zip(urgency_true, urgency_pred) if yt == critical_label and yp != critical_label)
        fp = sum(1 for yt, yp in zip(urgency_true, urgency_pred) if yt != critical_label and yp == critical_label)

        critical_recall = tp / (tp + fn) if (tp + fn) > 0 else 1.0

        return {
            "critical_true_positives": tp,
            "critical_false_negatives": fn,  # LIFE THREATENING ERROR IF > 0
            "critical_false_positives": fp,
            "critical_recall": round(critical_recall, 4),
            "target_critical_recall": HealthcareEvaluationMetrics.TARGET_CRITICAL_RECALL,
            "meets_safety_standard": critical_recall >= HealthcareEvaluationMetrics.TARGET_CRITICAL_RECALL
        }

    @staticmethod
    def benchmark_inference_latency(predict_fn, sample_inputs: List[Any], runs: int = 50) -> Dict[str, float]:
        """
        Measures inference execution time (P50, P95, P99 in milliseconds).
        """
        latencies_ms = []

        # Warm-up run
        if sample_inputs:
            predict_fn(sample_inputs[0])

        for _ in range(runs):
            for item in sample_inputs:
                start_time = time.perf_counter()
                predict_fn(item)
                elapsed_ms = (time.perf_counter() - start_time) * 1000.0
                latencies_ms.append(elapsed_ms)

        p50 = float(np.percentile(latencies_ms, 50))
        p95 = float(np.percentile(latencies_ms, 95))
        p99 = float(np.percentile(latencies_ms, 99))
        mean_latency = float(np.mean(latencies_ms))

        return {
            "mean_latency_ms": round(mean_latency, 2),
            "p50_ms": round(p50, 2),
            "p95_ms": round(p95, 2),
            "p99_ms": round(p99, 2),
            "meets_latency_sla": p95 <= HealthcareEvaluationMetrics.TARGET_MAX_LATENCY_MS,
            "target_max_latency_ms": HealthcareEvaluationMetrics.TARGET_MAX_LATENCY_MS
        }


# Quick sanity test demonstration
if __name__ == "__main__":
    y_t = ["Cardiology", "Neurology", "Cardiology", "Dermatology"]
    y_p = ["Cardiology", "Neurology", "Cardiology", "Dermatology"]
    urg_t = ["CRITICAL", "ROUTINE", "CRITICAL", "ROUTINE"]
    urg_p = ["CRITICAL", "ROUTINE", "CRITICAL", "ROUTINE"]

    results = HealthcareEvaluationMetrics.calculate_classification_metrics(y_t, y_p)
    crit_eval = HealthcareEvaluationMetrics.evaluate_critical_recall(urg_t, urg_p)

    print("✅ Classification Evaluation:", results)
    print("✅ Critical Recall Evaluation:", crit_eval)
