module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      // Đảm bảo không có "expo-router/babel" ở đây
      "react-native-reanimated/plugin",
    ],
  };
};
