import { FontFamily, FontSize, SpacingSize, ThemeConfig } from '../../types/resume';

export function getFontFamilyClass(font: FontFamily): string {
  switch (font) {
    case 'Plus Jakarta Sans':
      return "font-['Plus_Jakarta_Sans',sans-serif]";
    case 'Inter':
      return "font-['Inter',sans-serif]";
    case 'EB Garamond':
      return "font-['EB_Garamond',serif]";
    case 'Merriweather':
      return "font-['Merriweather',serif]";
    case 'JetBrains Mono':
      return "font-['JetBrains_Mono',monospace]";
    default:
      return "font-['Plus_Jakarta_Sans',sans-serif]";
  }
}

export function getSpacingClasses(spacing: SpacingSize) {
  switch (spacing) {
    case 'compact':
      return {
        sectionGap: 'space-y-3.5',
        itemGap: 'space-y-1.5',
        padding: 'p-6 sm:p-8',
        marginB: 'mb-1',
      };
    case 'spacious':
      return {
        sectionGap: 'space-y-7',
        itemGap: 'space-y-3.5',
        padding: 'p-8 sm:p-12',
        marginB: 'mb-2.5',
      };
    case 'balanced':
    default:
      return {
        sectionGap: 'space-y-5',
        itemGap: 'space-y-2.5',
        padding: 'p-7 sm:p-10',
        marginB: 'mb-1.5',
      };
  }
}

export function getFontSizeClasses(size: FontSize) {
  switch (size) {
    case 'sm':
      return {
        name: 'text-xl sm:text-2xl',
        title: 'text-xs sm:text-sm',
        heading: 'text-xs sm:text-sm font-bold tracking-wider',
        body: 'text-xs leading-relaxed',
        meta: 'text-[11px]',
      };
    case 'lg':
      return {
        name: 'text-2xl sm:text-3xl',
        title: 'text-sm sm:text-base',
        heading: 'text-sm sm:text-base font-bold tracking-wider',
        body: 'text-sm sm:text-[15px] leading-relaxed',
        meta: 'text-xs sm:text-sm',
      };
    case 'base':
    default:
      return {
        name: 'text-2xl sm:text-[28px]',
        title: 'text-xs sm:text-sm',
        heading: 'text-xs sm:text-sm font-bold tracking-wider',
        body: 'text-[13px] leading-relaxed',
        meta: 'text-xs',
      };
  }
}

export function renderHeadingStyle(
  title: string,
  style: ThemeConfig['headingStyle'],
  accentColor: string,
  extraClasses = ''
) {
  const isUpper = style === 'uppercase';
  const displayTitle = isUpper ? title.toUpperCase() : title;

  switch (style) {
    case 'bar':
      return (
        <div className={`flex items-center gap-2.5 mb-2 ${extraClasses}`}>
          <div
            className="w-1.5 h-4.5 rounded-full shrink-0"
            style={{ backgroundColor: accentColor }}
          />
          <h2
            className="font-bold tracking-wide"
            style={{ color: accentColor }}
          >
            {displayTitle}
          </h2>
          <div className="h-px bg-slate-200 grow ml-1" />
        </div>
      );
    case 'underline':
      return (
        <div className={`border-b-2 pb-1 mb-2.5 ${extraClasses}`} style={{ borderColor: accentColor }}>
          <h2 className="font-bold tracking-wide text-slate-900">
            {displayTitle}
          </h2>
        </div>
      );
    case 'uppercase':
      return (
        <div className={`flex items-center justify-between border-b border-slate-200 pb-1 mb-2 ${extraClasses}`}>
          <h2
            className="font-bold tracking-wider text-xs"
            style={{ color: accentColor }}
          >
            {displayTitle}
          </h2>
        </div>
      );
    case 'titlecase':
    default:
      return (
        <div className={`flex items-center gap-2 border-b border-slate-200 pb-1 mb-2 ${extraClasses}`}>
          <h2 className="font-bold tracking-tight text-slate-900">
            {displayTitle}
          </h2>
        </div>
      );
  }
}
