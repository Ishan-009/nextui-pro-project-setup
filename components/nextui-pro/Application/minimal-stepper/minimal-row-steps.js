"use client";

import React from "react";
import {useControlledState} from "@react-stately/utils";
import {m, LazyMotion, domAnimation} from "framer-motion";

import {cn} from "./cn";

function CheckIcon(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <m.path
        animate={{pathLength: 1}}
        d="M5 13l4 4L19 7"
        initial={{pathLength: 0}}
        strokeLinecap="round"
        strokeLinejoin="round"
        transition={{
          delay: 0.2,
          type: "tween",
          ease: "easeOut",
          duration: 0.3,
        }}
      />
    </svg>
  );
}

const MinimalRowSteps = React.forwardRef(
  (
    {
      color = "primary",
      stepsCount = 3,
      defaultStep = 0,
      label,
      onStepChange,
      currentStep: currentStepProp,
      hideProgressBars = false,
      stepClassName,
      className,
      ...props
    },
    ref,
  ) => {
    const [currentStep, setCurrentStep] = useControlledState(
      currentStepProp,
      defaultStep,
      onStepChange,
    );

    const colors = React.useMemo(() => {
      let userColor;
      let fgColor;

      const colorsVars = [
        "[--active-fg-color:hsl(var(--step-fg-color))]",
        "[--active-border-color:hsl(var(--step-color))]",
        "[--active-color:hsl(var(--step-color))]",
        "[--complete-background-color:hsl(var(--step-color))]",
        "[--complete-border-color:hsl(var(--step-color))]",
        "[--inactive-border-color:hsl(var(--nextui-default-300))]",
        "[--inactive-color:hsl(var(--nextui-default-300))]",
      ];

      switch (color) {
        case "primary":
          userColor = "[--step-color:var(--nextui-primary)]";
          fgColor = "[--step-fg-color:var(--nextui-primary-foreground)]";
          break;
        case "secondary":
          userColor = "[--step-color:var(--nextui-secondary)]";
          fgColor = "[--step-fg-color:var(--nextui-secondary-foreground)]";
          break;
        case "success":
          userColor = "[--step-color:var(--nextui-success)]";
          fgColor = "[--step-fg-color:var(--nextui-success-foreground)]";
          break;
        case "warning":
          userColor = "[--step-color:var(--nextui-warning)]";
          fgColor = "[--step-fg-color:var(--nextui-warning-foreground)]";
          break;
        case "danger":
          userColor = "[--step-color:var(--nextui-error)]";
          fgColor = "[--step-fg-color:var(--nextui-error-foreground)]";
          break;
        case "default":
          userColor = "[--step-color:var(--nextui-default)]";
          fgColor = "[--step-fg-color:var(--nextui-default-foreground)]";
          break;
        default:
          userColor = "[--step-color:var(--nextui-primary)]";
          fgColor = "[--step-fg-color:var(--nextui-primary-foreground)]";
          break;
      }

      colorsVars.unshift(fgColor);
      colorsVars.unshift(userColor);

      return colorsVars;
    }, [color]);

    return (
      <nav aria-label="Progress" className="flex max-w-fit items-center">
        {label && (
          <label className="w-28 text-small font-medium text-default-foreground lg:text-medium">
            {label}
          </label>
        )}

        <ol
          className={cn("flex flex-row flex-nowrap gap-x-3 overflow-x-scroll ", colors, className)}
        >
          {Array.from({length: stepsCount})?.map((_, stepIdx) => {
            let status =
              currentStep === stepIdx ? "active" : currentStep < stepIdx ? "inactive" : "complete";

            return (
              <li key={stepIdx} className="relative flex w-full items-center pr-12">
                <button
                  key={stepIdx}
                  ref={ref}
                  aria-current={status === "active" ? "step" : undefined}
                  className={cn(
                    "group flex w-full cursor-pointer flex-row items-center justify-center gap-x-3 rounded-large py-2.5",
                    stepClassName,
                  )}
                  onClick={() => setCurrentStep(stepIdx)}
                  {...props}
                >
                  <div className="h-ful relative flex items-center">
                    <LazyMotion features={domAnimation}>
                      <m.div animate={status} className="relative">
                        <m.div
                          className={cn(
                            "relative flex h-[26px] w-[26px] items-center justify-center rounded-full border-medium text-large font-semibold text-default-foreground",
                            {
                              "shadow-lg": status === "complete",
                            },
                          )}
                          initial={false}
                          transition={{duration: 0.25}}
                          variants={{
                            inactive: {
                              backgroundColor: "transparent",
                              borderColor: "var(--inactive-border-color)",
                              color: "var(--inactive-color)",
                            },
                            active: {
                              backgroundColor: "transparent",
                              borderColor: "var(--active-border-color)",
                              color: "var(--active-color)",
                            },
                            complete: {
                              backgroundColor: "var(--complete-background-color)",
                              borderColor: "var(--complete-border-color)",
                            },
                          }}
                        >
                          <div className="flex items-center justify-center">
                            {status === "complete" ? (
                              <CheckIcon className="h-5 w-5 text-[var(--active-fg-color)]" />
                            ) : (
                              <span />
                            )}
                          </div>
                        </m.div>
                      </m.div>
                    </LazyMotion>
                  </div>
                  {stepIdx < stepsCount - 1 && !hideProgressBars && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 left-[26px] w-[calc(100%_-_13px)] flex-none items-center"
                      style={{
                        // @ts-ignore
                        "--idx": stepIdx,
                      }}
                    >
                      <div
                        className={cn(
                          "relative h-0.5 w-full bg-default-200 transition-colors duration-300",
                          "after:absolute after:block after:h-full after:w-0 after:bg-[var(--active-border-color)] after:transition-[width] after:duration-300 after:content-['']",
                          {
                            "after:w-full": stepIdx < currentStep,
                          },
                        )}
                      />
                    </div>
                  )}
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);

MinimalRowSteps.displayName = "MinimalRowSteps";

export default MinimalRowSteps;
