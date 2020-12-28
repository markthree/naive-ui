import { c, cTB, cB, cE, cM, createKey } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      $local: {
        headerTextColor,
        contentTextColor,
        metaTextColor,
        lineColor,
        headerFontWeight,
        fontSize
      },
      $global: {
        cubicBezierEaseInOut
      }
    } = props
    return cTB('timeline', {
      raw: `
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: column;
      `
    }, [
      ['medium', 'large'].map(size => sizeStyle(size, props.$local)),
      cM('right-placement', [
        cB('timeline-item', [
          cB('timeline-item-content', {
            raw: `
              text-align: right;
              margin-right: 26px;
            `
          }),
          cB('timeline-item-timeline', {
            raw: `
              width: 14px;
              right: 0;
            `
          })
        ])
      ]),
      cM('left-placement', [
        cB('timeline-item', [
          cB('timeline-item-content', {
            raw: `
              margin-left: 26px;
            `
          }),
          cB('timeline-item-timeline', {
            raw: `
              left: 0;
            `
          })
        ])
      ]),
      cB('timeline-item', {
        raw: `
          position: relative;
        `
      }, [
        ['default', 'success', 'info', 'warning', 'error']
          .map(type => itemTypeStyle(type, props.$local)),
        c('&:last-child', [
          cB('timeline-item-timeline', [
            cE('line', {
              raw: `
                display: none;
              `
            })
          ])
        ]),
        cB('timeline-item-content', [
          cE('title', {
            raw: `
              transition: color .3s ${cubicBezierEaseInOut};
              line-height: 1.25;
              font-weight: ${headerFontWeight};
              margin-bottom: 6px;
              color: ${headerTextColor};
            `
          }),
          cE('content', {
            raw: `
              transition: color .3s ${cubicBezierEaseInOut};
              font-size: ${fontSize};
              color: ${contentTextColor};
            `
          }),
          cE('meta', {
            raw: `
              transition: color .3s ${cubicBezierEaseInOut};
              font-size: 12px;
              margin-top: 6px;
              margin-bottom: 20px;
              color: ${metaTextColor};
            `
          })
        ]),
        cB('timeline-item-timeline', {
          raw: `
            width: 26px;
            position: absolute;
            top: 2px;
            bottom: 0;
            height: 100%;
          `
        }, [
          cE('circle', {
            raw: `
              transition:
                background-color .3s ${cubicBezierEaseInOut},
                border-color .3s ${cubicBezierEaseInOut};
              width: 14px;
              height: 14px;
              border-radius: 7px;
              box-sizing: border-box;
              border-style: solid;
              border-width: 2px;
            `
          }),
          cE('line', {
            raw: `
              transition: background-color .3s ${cubicBezierEaseInOut};
              position: absolute;
              top: 14px;
              left: 6px;
              bottom: 0px;
              width: 2px;
              background-color: ${lineColor};
            `
          })
        ])
      ])
    ])
  }
])

function itemTypeStyle (type, palette) {
  return cM(`${type}-type`, [
    cB('timeline-item-timeline', [
      cE('circle', {
        raw: `
          border-color: ${palette[createKey('circleBorderColor', type)]}
        `
      })
    ])
  ])
}

function sizeStyle (size, props) {
  return cM(`${size}-size`, [
    cB('timeline-item', [
      cB('timeline-item-content', [
        cE('title', {
          raw: `
            margin-top: ${props[createKey('headerMarginTop', size)]};
            font-size: ${props[createKey('headerFontSize', size)]}
          `
        })
      ])
    ])
  ])
}
