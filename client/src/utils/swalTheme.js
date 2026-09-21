export const getSwalThemeOptions = () => {
  const styles = getComputedStyle(document.documentElement);
  return {
    background: styles.getPropertyValue("--bg-card").trim(),
    color: styles.getPropertyValue("--text-primary").trim(),
  };
};
