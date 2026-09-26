import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QRCodeCanvas } from 'qrcode.react'
import { ArrowLeft, Download, Copy, Check } from 'lucide-react'
import PageTransition from '../components/PageTransition'
export default function QR() {
  const wrap = useRef(null); const [copied, setCopied] = useState(false); const navigate = useNavigate(); const url = `${location.origin}${location.pathname}#/`
  const download = () => { const canvas = wrap.current?.querySelector('canvas'); if (!canvas) return; const link = document.createElement('a'); link.download = 'ezhil-birthday-mission-qr.png'; link.href = canvas.toDataURL('image/png'); link.click() }
  const copy = async () => { try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1600) } catch { /* Clipboard permission may be denied. */ } }
  return <PageTransition className="page qr-page"><header className="page-header"><p className="eyebrow">Mission access card</p><h1>Scan to start Ezhil’s birthday mission</h1></header><section className="qr-card glass" ref={wrap}><div className="qr-wrap"><QRCodeCanvas value={url} size={280} level="H" marginSize={2} bgColor="#ffffff" fgColor="#080a12" title="QR code for Ezhil's birthday mission"/></div><p className="qr-url">{url}</p><div className="qr-actions"><button type="button" className="primary" onClick={download}><Download/> Download QR</button><button type="button" className="secondary" onClick={copy}>{copied ? <Check/> : <Copy/>}{copied ? 'Copied' : 'Copy URL'}</button></div></section><button type="button" className="text-button qr-back" onClick={() => navigate('/')}><ArrowLeft/> Back to mission</button></PageTransition>
}
