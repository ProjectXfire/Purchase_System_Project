// React
import React from 'react'
// Next
import Link from 'next/link'
// Providers
import { useTranslation } from 'next-i18next'
// Models
import { Requisition } from '@models/requisition/requisition.model'
// Styles
import { Button } from 'semantic-ui-react'
// Components
import { RequisitionDetailComponent } from '@components/requisition/requisition/detail'

export const RequisitionApprovalDetailComponent = ({
  requisition
}: {
  requisition: Requisition
}): React.ReactElement => {
  const { t } = useTranslation('common')
  return (
    <>
      <RequisitionDetailComponent
        requisition={requisition}
        disableButtonBack={true}
      />
      <Link href="/requisition/approvals/list">
        <Button type="button">{t('back_button')}</Button>
      </Link>
    </>
  )
}
