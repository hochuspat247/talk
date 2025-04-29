// src/constants/Colors.ts
export const Colors = {
  /**
   * Основной синий цвет, используемый для кнопок, активных элементов и акцентов.
   * Применяется в Button (variant: primary), ToggleSwitch (activeTab).
   */
  primary: '#195CC5',

  /**
   * Серый цвет для отключённых элементов, таких как кнопки или поля ввода.
   * Применяется в Button (disabled), ToggleSwitch (blocked).
   */
  disabled: '#ADADAD',

  /**
   * Белый цвет для текста, иконок и фонов.
   * Применяется в Input (tabText, icon), Button (text), ToggleSwitch (tabText, icon).
   */
  white: '#FFFFFF',

  /**
   * Светло-серый цвет для фона экранов и полей ввода.
   * Применяется в Input (container), TransparentContainer (fallback).
   */
  background: '#F0F0F0',

  /**
   * Красный цвет для вторичных акцентов, например, рамок или кнопок.
   * Применяется в Button (variant: secondary), Input (error states).
   */
  secondary: '#FF7F7F',

  /**
   * Тёмно-серый цвет для основного текста.
   * Применяется в Input (text), Button (textButtonText).
   */
  text: '#333333',

  /**
   * Фиолетовый цвет для выделения элементов, таких как кнопки или акценты.
   * Применяется в Button (variant: accent), WavesBackground (iconVariant).
   */
  accent: '#5856D6',

  /**
   * Зелёный цвет для индикации успешных действий или состояний.
   * Применяется в Input (success states), WavesBackground (fallback).
   */
  success: '#34C759',

  /**
   * Тёмно-красный цвет для индикации ошибок, например, валидации.
   * Применяется в Input (errorBorder, errorText, codeInputError).
   */
  error: '#B91C1C',

  /**
   * Светло-серый цвет для границ элементов, таких как поля ввода.
   * Применяется в Input (strengthBarInactive), ToggleSwitch (fallback).
   */
  border: '#E0E0E0',

  /**
   * Тёмно-красный цвет для ошибок, связанных с оплатой картой.
   * Применяется в специфичных экранах оплаты (например, error states).
   */
  error_card: '#b91c1c',

  /**
   * Полупрозрачный чёрный (10%) для фонов контейнеров.
   * Применяется в ToggleSwitch (container).
   */
  transparentDark10: 'rgba(0, 0, 0, 0.1)',

  /**
   * Полупрозрачный чёрный (30%) для активных элементов или выделения.
   * Применяется в ToggleSwitch (activeTab).
   */
  transparentDark30: 'rgba(0, 0, 0, 0.3)',

  /**
   * Оранжевый цвет для волны в цветовой схеме default.
   * Применяется в WavesBackground (orange wave, default).
   */
  waveOrange: '#FF9F69',

  /**
   * Жёлтый цвет для волны в цветовой схеме default.
   * Применяется в WavesBackground (yellow wave, default).
   */
  waveYellow: '#FFD150',

  /**
   * Синий цвет для волны в цветовой схеме alternate.
   * Применяется в WavesBackground (orange wave, alternate).
   */
  waveBlue: '#8097F0',

  /**
   * Розовый цвет для волны в цветовой схеме alternate.
   * Применяется в WavesBackground (yellow wave, alternate).
   */
  wavePink: '#F090F1',

  /**
   * Полупрозрачный белый (10%) для прозрачных фонов контейнеров.
   * Применяется в TransparentContainer (container).
   */
  transparentWhite10: 'rgba(255, 255, 255, 0.1)',

  /**
   * Полупрозрачный белый (5%) для фона полей ввода.
   * Применяется в Input (input, codeInput).
   */
  transparentWhite5: 'rgba(255, 255, 255, 0.05)',

  /**
   * Полупрозрачный серый (50%) для границ полей ввода.
   * Применяется в Input (input, codeInput).
   */
  gray50Transparent: 'rgba(153, 153, 153, 0.5)',

  /**
   * Чёрный цвет для текста и активных полосок силы пароля.
   * Применяется в Input (input text, codeInput text, strengthBarActive).
   */
  black: '#000000',

  /**
   * Светло-серый цвет для границ временных полей ввода.
   * Применяется в Input (timeInput border).
   */
  grayLight: '#cccccc',

  /**
   * Ярко-зелёный цвет для успешных границ полей ввода.
   * Применяется в Input (successBorder, codeInputSuccess).
   */
  successBright: '#00FF00',

  /**
   * Средне-серый цвет для второстепенного текста, такого как подтекст.
   * Применяется в Input (subText).
   */
  grayMedium: '#999999',

  /**
   * Оранжевый цвет для выделенного подтекста, например, ссылок.
   * Применяется в Input (subTextHighlighted).
   */
  orangeHighlight: '#FF8C00',

  /**
   * Светло-красный цвет для индикации слабой силы пароля.
   * Применяется в Input (strengthBar weak).
   */
  errorLight: '#ff4d4f',

  /**
   * Жёлтый цвет для индикации средней силы пароля.
   * Применяется в Input (strengthBar medium).
   */
  warning: '#faad14',

  /**
   * Средне-зелёный цвет для индикации сильной силы пароля.
   * Применяется в Input (strengthBar strong).
   */
  successMedium: '#52c41a',
};