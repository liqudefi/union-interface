import classNames from "classnames";
import PropTypes from "prop-types";

/**
 * @name LabelPair
 * @description Used to present a piece of information with an accompanying label
 *
 * @param {String} className Any additional classes to spread into the wrapper
 * @param {String} label
 * @param {any} tooltip Renders a tooltip and an icon next to the label to indicate more information, accepts anything to be placed in the tooltip body
 * @param {String} value
 * @param {Boolean} large Changes the LabelPair to be stacked
 */
const LabelPair = ({
  className = "",
  label,
  tooltip,
  value,
  large = false
}) => {
  const cachedLabelClassNames = classNames("leading-tight", {
    "text-lg mb-2": large
  });

  const cachedValueClassNames = classNames(
    "leading-tight font-semibold",
    `text-${large ? "xl" : "lg"}`,
    `text-${large ? "left" : "right"}`
  );

  const cachedClassNames = classNames(className, {
    "flex justify-between items-center py-2": !large
  });

  return (
    <dl className={cachedClassNames}>
      <dt className={cachedLabelClassNames}>
        {tooltip ? (
          <div className="flex items-center" title={tooltip}>
            <div className="mr-2">{label}</div>
            <span
              className="text-sm leading-none"
              role="img"
              aria-label="Information"
            >
              ℹ️
            </span>
          </div>
        ) : (
          label
        )}
      </dt>
      <dd className={cachedValueClassNames}>{value}</dd>
    </dl>
  );
};

LabelPair.propTypes = {
  /**
   * Any additional classes to spread into the wrapper
   */
  className: PropTypes.string,
  label: PropTypes.any.isRequired,
  /**
   * Renders a tooltip and an icon next to the label to indicate more information, accepts anything to be placed in the tooltip body
   */
  tooltip: PropTypes.any,
  value: PropTypes.any.isRequired,
  /**
   * Changes the LabelPair to be stacked
   */
  large: PropTypes.bool
};

export default LabelPair;