// @flow
import * as React from 'react'

import { useTranslation } from 'react-i18next'
import { AlertModal } from '@opentrons/components'
import styles from './styles.css'

export type ConfirmStartDeckCalModalProps = {|
  cancel: () => mixed,
  confirm: () => mixed,
|}

export function ConfirmStartDeckCalModal(
  props: ConfirmStartDeckCalModalProps
): React.Node {
  const { cancel, confirm } = props
  const { t } = useTranslation(['robot_calibration', 'shared'])

  return (
    <AlertModal
      heading={t('recalibrate_warning_heading')}
      buttons={[
        { children: t('shared:cancel'), onClick: cancel },
        { children: t('shared:continue'), onClick: confirm },
      ]}
      alertOverlay
      iconName={null}
      className={styles.confirm_start_deck_cal_modal}
    >
      {t('recalibrate_warning_body')}
    </AlertModal>
  )
}
