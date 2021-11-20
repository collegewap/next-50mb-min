import Link, { LinkProps } from 'next/link'
export default function CustomLink({
  as,
  href,
  ...otherProps
}: React.PropsWithChildren<LinkProps>): JSX.Element {
  return (
    <>
      <Link as={as} href={href}>
        <a className="text-red-600" {...otherProps} />
      </Link>
    </>
  )
}
