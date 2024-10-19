import { Card, CardContent } from '@/components/ui/card'
import { IconFileUnknown } from '@tabler/icons-react'
import React from 'react'

const NotFound = () => {
  return (
    <Card className="mx-auto max-w-md m-t-4">
        <CardContent >
            <p className="flex items-center justify-center gap-2 text-2xl"> 
                <IconFileUnknown />
                This page cannot be found. </p>
        </CardContent>
    </Card>
  )
}

export default NotFound