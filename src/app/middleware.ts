/* import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from '@/logActions'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  
  if (request.nextUrl.pathname.startsWith('/logout')) {

    const session = await getSession()
    session.destroy()

    return NextResponse.redirect('login')
  }
  
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/logout'
} */